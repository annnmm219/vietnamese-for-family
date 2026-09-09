(() => {
  const cfg = window.VFF_EVALUATOR_CONFIG || {};
  const LABELS = new Set([
    "correct_natural",
    "acceptable_variation",
    "correct_but_unnatural",
    "wrong_politeness",
    "wrong_kinship_term",
    "grammar_error",
    "meaning_error",
    "ambiguous"
  ]);

  function isConfigured() {
    return typeof cfg.endpoint === "string" && /^https:\/\//i.test(cfg.endpoint.trim());
  }

  function clampScore(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return 0;
    return Math.max(0, Math.min(5, Math.round(n)));
  }

  function validateResult(raw) {
    const label = LABELS.has(raw?.overall_label) ? raw.overall_label : "ambiguous";
    const scores = raw?.scores || {};
    return {
      source: "ai",
      overallLabel: label,
      scores: [
        clampScore(scores.meaning),
        clampScore(scores.politeness),
        clampScore(scores.kinship_language),
        clampScore(scores.naturalness),
        clampScore(scores.cultural_fit),
        clampScore(scores.grammar)
      ],
      errorClasses: Array.isArray(raw?.error_classes) ? raw.error_classes.filter(Boolean).slice(0, 8) : [],
      feedback: String(raw?.feedback || "").slice(0, 700),
      suggestedResponse: String(raw?.suggested_response || "").slice(0, 300),
      confidence: Math.max(0, Math.min(1, Number(raw?.confidence) || 0)),
      judgmentMode: ["firm", "soft", "insufficient_context"].includes(raw?.judgment_mode)
        ? raw.judgment_mode
        : "soft",
      evaluatorVersion: String(raw?.evaluator_version || cfg.version || "southern-evaluator-v1")
    };
  }

  async function evaluate({ lesson, scenario, learnerResponse }) {
    if (!isConfigured()) {
      const error = new Error("AI evaluator endpoint is not configured.");
      error.code = "NOT_CONFIGURED";
      throw error;
    }

    const controller = new AbortController();
    const timeoutMs = Number(cfg.requestTimeoutMs) || 15000;
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(cfg.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          version: cfg.version || "southern-evaluator-v1",
          region: "south",
          lesson: {
            id: lesson.id,
            title: lesson.title
          },
          scenario: {
            id: scenario.scenarioId,
            speaker_relationship: scenario.speaker,
            context: scenario.context,
            prompt: scenario.prompt,
            expected_intent: scenario.expectedIntent,
            canonical_response: scenario.canonical
          },
          learner_response: String(learnerResponse || "").slice(0, 400)
        })
      });

      if (!response.ok) {
        let details = {};
        try { details = await response.json(); } catch {}
        const error = new Error(String(details?.error || `Evaluator request failed (${response.status}).`));
        error.code = String(details?.code || "HTTP_ERROR");
        error.status = response.status;
        error.upstreamStatus = details?.upstream_status;
        error.upstreamCode = details?.upstream_code;
        error.upstreamMessage = details?.upstream_message;
        error.detail = details?.detail;
        throw error;
      }

      return validateResult(await response.json());
    } catch (error) {
      if (error?.name === "AbortError") {
        const timeoutError = new Error("Evaluator timed out.");
        timeoutError.code = "TIMEOUT";
        throw timeoutError;
      }
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }

  window.VFF_EVALUATOR_CLIENT = Object.freeze({
    isConfigured,
    evaluate,
    minimumConfidence: Number(cfg.minimumConfidence) || 0.65
  });
})();
