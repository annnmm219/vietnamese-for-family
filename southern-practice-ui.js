(() => {
  const baseRenderLesson = renderLesson;
  const SCORE_LABELS = ["Meaning", "Politeness", "Kinship", "Naturalness", "Cultural fit", "Grammar"];
  const LABEL_UI = {
    correct_natural: { title: "Natural and appropriate", tone: "good" },
    acceptable_variation: { title: "Accepted variation", tone: "good" },
    correct_but_unnatural: { title: "Meaning works, but it sounds unnatural", tone: "warn" },
    wrong_politeness: { title: "Tone needs work", tone: "warn" },
    wrong_kinship_term: { title: "Relationship language needs work", tone: "warn" },
    grammar_error: { title: "Grammar needs work", tone: "warn" },
    meaning_error: { title: "This does not fit the situation", tone: "bad" },
    ambiguous: { title: "This could depend on context", tone: "neutral" }
  };

  function evaluatorClient() {
    return window.VFF_EVALUATOR_CLIENT || null;
  }

  function goldLesson(lessonId) {
    return window[`SOUTHERN_GOLD_SET_V1_L${lessonId}`] || null;
  }

  function normalizeVietnamese(value) {
    return String(value || "")
      .normalize("NFC")
      .toLocaleLowerCase("vi")
      .replace(/[“”\"'‘’.,!?;:()\[\]{}…]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function scenarioIndexKey(lessonId) {
    return `vff-southern-practice-scenario-${lessonId}`;
  }

  function currentScenarioIndex(lessonId, total) {
    const saved = Number(localStorage.getItem(scenarioIndexKey(lessonId)) || 0);
    return Number.isFinite(saved) && saved >= 0 ? saved % total : 0;
  }

  function scoreGrid(scores) {
    return `<div class="practice-score-grid">${scores.map((score, index) => `
      <div class="practice-score-item">
        <span>${esc(SCORE_LABELS[index])}</span>
        <strong>${esc(score)}/5</strong>
      </div>`).join("")}</div>`;
  }

  function renderPracticeCard(lesson) {
    const data = goldLesson(lesson.id);
    if (!data || !data.scenarios?.length) return "";
    const index = currentScenarioIndex(lesson.id, data.scenarios.length);
    const scenario = data.scenarios[index];
    const spokenPrompt = scenario.prompt && scenario.prompt !== "—";
    const aiReady = evaluatorClient()?.isConfigured?.() === true;
    const evaluatorCopy = aiReady
      ? "Gold Set responses are checked locally. New wording is evaluated by the Southern AI evaluator."
      : "Gold Set responses are checked locally. New wording stays unscored until the secure AI endpoint is connected.";

    return `<section class="lesson-section southern-practice-section" data-southern-practice data-lesson-id="${lesson.id}" data-scenario-id="${esc(scenario.scenarioId)}">
      <div class="section-head">
        <p class="section-kicker">Southern free response · Beta</p>
        <h2>Say it in your own words.</h2>
        <p>${esc(evaluatorCopy)}</p>
      </div>
      <div class="section-body">
        <div class="practice-situation">
          <div class="practice-situation-meta">
            <span>${esc(scenario.speaker)}</span>
            <span>Scenario ${index + 1} of ${data.scenarios.length}</span>
          </div>
          <p class="practice-context">${esc(scenario.context)}</p>
          ${spokenPrompt ? `<blockquote class="practice-prompt">“${esc(scenario.prompt)}”</blockquote>` : ""}
          <p class="practice-intent"><strong>Your job:</strong> ${esc(scenario.expectedIntent)}</p>
        </div>

        <label class="practice-input-label" for="practice-answer-${lesson.id}">Your answer</label>
        <textarea id="practice-answer-${lesson.id}" class="practice-answer" rows="3" autocomplete="off" spellcheck="false" maxlength="400" placeholder="Type your Southern Vietnamese response…"></textarea>
        <div class="practice-actions">
          <button class="practice-check" type="button" data-practice-check>Check answer</button>
          <button class="practice-next" type="button" data-practice-next>Try another situation</button>
        </div>
        <div class="practice-result" data-practice-result aria-live="polite"></div>
      </div>
    </section>`;
  }

  function insertPractice(lesson) {
    if (state.dialect !== "south" || lesson.id < 1 || lesson.id > 5 || !isReady(lesson)) return;
    const card = renderPracticeCard(lesson);
    if (!card) return;
    const completion = lessonRoot.querySelector(".completion-card");
    if (completion) completion.insertAdjacentHTML("beforebegin", card);
    else lessonRoot.insertAdjacentHTML("beforeend", card);
  }

  function renderMatchedResult(resultNode, matched) {
    const meta = LABEL_UI[matched.label] || LABEL_UI.ambiguous;
    const sourceLabel = matched.caseId === "Reference" ? "Native-approved reference" : `Gold Set ${esc(matched.caseId)}`;
    resultNode.innerHTML = `<div class="practice-feedback ${meta.tone}">
      <div class="practice-feedback-head">
        <strong>${esc(meta.title)}</strong>
        <span>${sourceLabel}</span>
      </div>
      <p>${esc(matched.feedback)}</p>
      <details>
        <summary>See benchmark scores</summary>
        ${scoreGrid(matched.scores)}
        ${matched.errors && matched.errors !== "none" ? `<p class="practice-error-tags"><strong>Signals:</strong> ${esc(matched.errors.replaceAll(";", ", ").replaceAll("_", " "))}</p>` : ""}
      </details>
    </div>`;
  }

  function renderAIResult(resultNode, evaluation) {
    const client = evaluatorClient();
    const lowConfidence = evaluation.confidence < (client?.minimumConfidence || 0.65) || evaluation.judgmentMode !== "firm";
    const meta = lowConfidence
      ? { title: "Soft AI judgment", tone: "neutral" }
      : (LABEL_UI[evaluation.overallLabel] || LABEL_UI.ambiguous);
    const confidence = Math.round(evaluation.confidence * 100);
    const errorText = evaluation.errorClasses?.length
      ? evaluation.errorClasses.join(", ").replaceAll("_", " ")
      : "none";

    resultNode.innerHTML = `<div class="practice-feedback ${meta.tone}">
      <div class="practice-feedback-head">
        <strong>${esc(meta.title)}</strong>
        <span>AI beta · ${confidence}% confidence</span>
      </div>
      <p>${esc(evaluation.feedback || "The evaluator returned a structured judgment.")}</p>
      ${evaluation.suggestedResponse ? `<p class="practice-reference">${esc(evaluation.suggestedResponse)}</p>` : ""}
      ${lowConfidence ? `<p class="practice-low-confidence">This result is intentionally non-categorical. Treat it as guidance rather than a correction.</p>` : ""}
      <details>
        <summary>See evaluator scores</summary>
        ${scoreGrid(evaluation.scores)}
        <p class="practice-error-tags"><strong>Signals:</strong> ${esc(errorText)}</p>
      </details>
    </div>`;
  }

  function renderUnknownResult(resultNode, scenario) {
    resultNode.innerHTML = `<div class="practice-feedback neutral">
      <div class="practice-feedback-head">
        <strong>Not scored yet</strong>
        <span>AI endpoint not connected</span>
      </div>
      <p>This answer is not one of the 120 Gold Set cases. The website will not guess whether it is correct until the secure evaluator endpoint is configured.</p>
      <details>
        <summary>Show native-approved reference</summary>
        <p class="practice-reference">${esc(scenario.canonical)}</p>
      </details>
    </div>`;
  }

  function renderEvaluatorError(resultNode, scenario) {
    resultNode.innerHTML = `<div class="practice-feedback neutral">
      <div class="practice-feedback-head">
        <strong>Evaluator unavailable</strong>
        <span>Your answer was not marked wrong</span>
      </div>
      <p>The AI evaluator could not return a reliable result. Try again later or compare with the native-approved reference.</p>
      <details>
        <summary>Show native-approved reference</summary>
        <p class="practice-reference">${esc(scenario.canonical)}</p>
      </details>
    </div>`;
  }

  function setEvaluating(card, active) {
    const button = card.querySelector("[data-practice-check]");
    const input = card.querySelector(".practice-answer");
    if (button) {
      button.disabled = active;
      button.textContent = active ? "Evaluating…" : "Check answer";
    }
    if (input) input.setAttribute("aria-busy", String(active));
  }

  async function checkPractice(card) {
    const lessonId = Number(card.dataset.lessonId);
    const lesson = LESSONS.find(item => item.id === lessonId);
    const data = goldLesson(lessonId);
    const scenario = data?.scenarios?.find(item => item.scenarioId === card.dataset.scenarioId);
    if (!scenario || !lesson) return;
    const input = card.querySelector(".practice-answer");
    const resultNode = card.querySelector("[data-practice-result]");
    const rawAnswer = String(input.value || "").trim();
    const answer = normalizeVietnamese(rawAnswer);
    if (!answer) {
      resultNode.innerHTML = `<p class="practice-empty">Type an answer first.</p>`;
      input.focus();
      return;
    }

    let matched = scenario.cases.find(item => normalizeVietnamese(item.response) === answer);
    if (!matched && normalizeVietnamese(scenario.canonical) === answer) {
      matched = {
        caseId: "Reference",
        label: "correct_natural",
        scores: [5,5,5,5,5,5],
        errors: "none",
        feedback: "This matches the native-approved Southern reference for the situation."
      };
    }

    if (matched) {
      renderMatchedResult(resultNode, matched);
      return;
    }

    const client = evaluatorClient();
    if (!client?.isConfigured?.()) {
      renderUnknownResult(resultNode, scenario);
      return;
    }

    setEvaluating(card, true);
    resultNode.innerHTML = `<div class="practice-feedback neutral practice-loading"><strong>Evaluating your wording…</strong><p>Checking meaning, tone, relationship language and naturalness.</p></div>`;
    try {
      const evaluation = await client.evaluate({ lesson, scenario, learnerResponse: rawAnswer });
      renderAIResult(resultNode, evaluation);
    } catch {
      renderEvaluatorError(resultNode, scenario);
    } finally {
      setEvaluating(card, false);
    }
  }

  function nextScenario(card) {
    const lessonId = Number(card.dataset.lessonId);
    const data = goldLesson(lessonId);
    if (!data?.scenarios?.length) return;
    const current = currentScenarioIndex(lessonId, data.scenarios.length);
    localStorage.setItem(scenarioIndexKey(lessonId), String((current + 1) % data.scenarios.length));
    renderLesson();
    const practice = lessonRoot.querySelector("[data-southern-practice]");
    if (practice) practice.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  renderLesson = function () {
    baseRenderLesson();
    insertPractice(currentLesson());
  };

  document.addEventListener("click", event => {
    const check = event.target.closest("[data-practice-check]");
    if (check) {
      checkPractice(check.closest("[data-southern-practice]"));
      return;
    }
    const next = event.target.closest("[data-practice-next]");
    if (next) nextScenario(next.closest("[data-southern-practice]"));
  });

  document.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      const card = event.target.closest?.("[data-southern-practice]");
      if (card) {
        event.preventDefault();
        checkPractice(card);
      }
    }
  });

  const totalCases = [1,2,3,4,5].reduce((sum, id) => {
    const lesson = goldLesson(id);
    return sum + (lesson?.scenarios || []).reduce((inner, scenario) => inner + scenario.cases.length, 0);
  }, 0);
  if (totalCases !== 120) console.warn(`Southern Gold Set V1 expected 120 cases, loaded ${totalCases}.`);

  renderLesson();
})();
