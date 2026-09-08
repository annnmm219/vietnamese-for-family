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
    error_classes: {
      type: "array",
      items: { type: "string" }
    },
    feedback: { type: "string" },
    suggested_response: { type: "string" },
    confidence: { type: "number", minimum: 0, maximum: 1 },
    judgment_mode: {
      type: "string",
      enum: ["firm", "soft", "insufficient_context"]
    },
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

function corsHeaders(origin, allowedOrigin) {
  return {
    "Access-Control-Allow-Origin": origin === allowedOrigin ? origin : allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}

function jsonResponse(body, status, origin, allowedOrigin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(origin, allowedOrigin)
    }
  });
}

function extractOutputText(responseJson) {
  for (const item of responseJson?.output || []) {
    for (const part of item?.content || []) {
      if (part?.type === "output_text" && typeof part.text === "string") return part.text;
    }
  }
  return "";
}

function systemPrompt() {
  return `You are the evaluation component for Vietnamese for Family.

Scope:
- Evaluate only everyday Southern Vietnamese, primarily Saigon / Ho Chi Minh City family speech.
- The learner is an adult non-Vietnamese partner/spouse speaking with their Vietnamese partner's family.
- The curriculum is authored and fixed. You evaluate the learner response; you do not redefine lesson goals.
- Treat the supplied canonical response as one native-approved reference, NOT as the only acceptable wording.
- Accept plausible everyday Southern variations even when they differ substantially from the reference.
- Do not reward textbook formality merely because it is grammatical.
- Judge relationship language carefully: with parents the learner normally uses con; the approved Southern course also uses con with grandparents; family plural is typically tụi con in the approved course context.
- Do not introduce Northern alternatives as corrections for a Southern learner.
- If context is insufficient, wording is genuinely ambiguous, or multiple judgments are plausible, lower confidence and use judgment_mode=soft or insufficient_context rather than declaring the answer wrong.

Score each dimension from 0 to 5:
Meaning: whether the intended message was communicated.
Politeness: whether register/tone suits the older family member and situation.
Kinship language: whether pronouns and relationship terms fit the relationship and Southern track.
Naturalness: whether a Southern native speaker could plausibly say it this way in ordinary family life.
Cultural fit: whether the response fits the family interaction rather than merely being grammatical.
Grammar: whether forms and word order are acceptable.

Feedback rules:
- Be concise and actionable for a beginner.
- If acceptable, do not manufacture a correction.
- If imperfect but understandable, identify the main issue instead of listing every possible improvement.
- suggested_response should be a short natural Southern alternative. If the learner response is already strong, it may repeat the learner's wording.
- Never expose hidden reasoning or internal deliberation.

Evaluator version: southern-evaluator-v1.`;
}

function userPayload(body) {
  return JSON.stringify({
    lesson: body.lesson,
    scenario: body.scenario,
    learner_response: body.learner_response
  });
}

export default {
  async fetch(request, env) {
    const allowedOrigin = env.SITE_ORIGIN || "https://annnmm219.github.io";
    const origin = request.headers.get("Origin") || allowedOrigin;

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin, allowedOrigin) });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405, origin, allowedOrigin);
    }

    if (origin !== allowedOrigin) {
      return jsonResponse({ error: "Origin not allowed" }, 403, origin, allowedOrigin);
    }

    if (!env.OPENAI_API_KEY) {
      return jsonResponse({ error: "Evaluator is not configured" }, 503, origin, allowedOrigin);
    }

    let body;
    try {
      const raw = await request.text();
      if (raw.length > 6000) return jsonResponse({ error: "Request too large" }, 413, origin, allowedOrigin);
      body = JSON.parse(raw);
    } catch {
      return jsonResponse({ error: "Invalid JSON" }, 400, origin, allowedOrigin);
    }

    const lessonId = Number(body?.lesson?.id);
    const learnerResponse = String(body?.learner_response || "").trim();
    if (body?.region !== "south" || lessonId < 1 || lessonId > 5 || !learnerResponse || learnerResponse.length > 400) {
      return jsonResponse({ error: "Invalid evaluator input" }, 400, origin, allowedOrigin);
    }

    const upstream = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: env.OPENAI_MODEL || "gpt-5.6-terra",
        input: [
          { role: "system", content: systemPrompt() },
          { role: "user", content: userPayload(body) }
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

    if (!upstream.ok) {
      return jsonResponse({ error: "Evaluator model request failed" }, 502, origin, allowedOrigin);
    }

    const upstreamJson = await upstream.json();
    const outputText = extractOutputText(upstreamJson);
    if (!outputText) {
      return jsonResponse({ error: "Evaluator returned no structured result" }, 502, origin, allowedOrigin);
    }

    try {
      return jsonResponse(JSON.parse(outputText), 200, origin, allowedOrigin);
    } catch {
      return jsonResponse({ error: "Evaluator returned invalid structured result" }, 502, origin, allowedOrigin);
    }
  }
};
