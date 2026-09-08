const OPENAI_URL = "https://api.openai.com/v1/responses";

const OUTPUT_SCHEMA = {
  type: "object",
  properties: {
    overall_label: {
      type: "string",
      enum: [
        "correct_natural",
        "acceptable_variation",
        "correct_but_unnatural",
        "wrong_politeness",
        "wrong_kinship_term",
        "grammar_error",
        "meaning_error",
        "ambiguous"
      ]
    },
    scores: {
      type: "object",
      properties: {
        meaning: { type: "integer", minimum: 0, maximum: 5 },
        politeness: { type: "integer", minimum: 0, maximum: 5 },
        kinship_language: { type: "integer", minimum: 0, maximum: 5 },
        naturalness: { type: "integer", minimum: 0, maximum: 5 },
        cultural_fit: { type: "integer", minimum: 0, maximum: 5 },
        grammar: { type: "integer", minimum: 0, maximum: 5 }
      },
      required: ["meaning", "politeness", "kinship_language", "naturalness", "cultural_fit", "grammar"],
      additionalProperties: false
    },
    error_classes: { type: "array", items: { type: "string" } },
    feedback: { type: "string" },
    suggested_response: { type: "string" },
    confidence: { type: "number", minimum: 0, maximum: 1 },
    judgment_mode: { type: "string", enum: ["firm", "soft", "insufficient_context"] },
    evaluator_version: { type: "string" }
  },
  required: [
    "overall_label",
    "scores",
    "error_classes",
    "feedback",
    "suggested_response",
    "confidence",
    "judgment_mode",
    "evaluator_version"
  ],
  additionalProperties: false
};

function systemPrompt() {
  return `You are the evaluation component for Vietnamese for Family.

Scope:
- Evaluate only everyday Southern Vietnamese, primarily Saigon / Ho Chi Minh City family speech.
- The learner is an adult non-Vietnamese partner/spouse speaking with their Vietnamese partner's family.
- The curriculum is authored and fixed. Evaluate the response; do not redefine the lesson objective.
- The canonical response is one native-approved reference, not the only acceptable wording.
- Accept plausible everyday Southern variations even when they differ substantially from the reference.
- Do not reward textbook formality merely because it is grammatical.
- Relationship language matters: parents normally take con; the approved Southern course also uses con with grandparents; family plural is normally tụi con in these course contexts.
- Do not introduce Northern alternatives as corrections for a Southern learner.
- If wording is genuinely ambiguous or context is insufficient, lower confidence and use soft or insufficient_context rather than declaring the response wrong.

Score 0-5 on meaning, politeness, kinship language, naturalness, cultural fit and grammar.

Feedback rules:
- Be concise and actionable for a beginner.
- If acceptable, do not manufacture a correction.
- If imperfect but understandable, identify the main issue.
- suggested_response should be a short natural Southern alternative. If the response is already strong, it may repeat the learner's wording.
- Never expose hidden reasoning.

Evaluator version: southern-evaluator-v1.`;
}

function extractOutputText(responseJson) {
  for (const item of responseJson?.output || []) {
    for (const part of item?.content || []) {
      if (part?.type === "output_text" && typeof part.text === "string") return part.text;
    }
  }
  return "";
}

function cors(req, res) {
  const allowedOrigin = process.env.SITE_ORIGIN || "https://annnmm219.github.io";
  const origin = req.headers.origin || allowedOrigin;
  res.setHeader("Access-Control-Allow-Origin", origin === allowedOrigin ? origin : allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");
  return { allowedOrigin, origin };
}

module.exports = async function handler(req, res) {
  const { allowedOrigin, origin } = cors(req, res);

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (origin !== allowedOrigin) return res.status(403).json({ error: "Origin not allowed" });
  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: "Evaluator is not configured" });

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); }
    catch { return res.status(400).json({ error: "Invalid JSON" }); }
  }

  const lessonId = Number(body?.lesson?.id);
  const learnerResponse = String(body?.learner_response || "").trim();
  if (body?.region !== "south" || lessonId < 1 || lessonId > 5 || !learnerResponse || learnerResponse.length > 400) {
    return res.status(400).json({ error: "Invalid evaluator input" });
  }

  try {
    const upstream = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.6-terra",
        input: [
          { role: "system", content: systemPrompt() },
          { role: "user", content: JSON.stringify({
            lesson: body.lesson,
            scenario: body.scenario,
            learner_response: learnerResponse
          }) }
        ],
        text: {
          format: {
            type: "json_schema",
            name: "southern_vietnamese_evaluation",
            strict: true,
            schema: OUTPUT_SCHEMA
          }
        }
      })
    });

    if (!upstream.ok) return res.status(502).json({ error: "Evaluator model request failed" });
    const upstreamJson = await upstream.json();
    const outputText = extractOutputText(upstreamJson);
    if (!outputText) return res.status(502).json({ error: "Evaluator returned no structured result" });

    try {
      return res.status(200).json(JSON.parse(outputText));
    } catch {
      return res.status(502).json({ error: "Evaluator returned invalid structured result" });
    }
  } catch {
    return res.status(502).json({ error: "Evaluator request failed" });
  }
};
