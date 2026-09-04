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

    return `<section class="lesson-section southern-practice-section" data-southern-practice data-lesson-id="${lesson.id}" data-scenario-id="${esc(scenario.scenarioId)}">
      <div class="section-head">
        <p class="section-kicker">Southern free response · Beta</p>
        <h2>Say it in your own words.</h2>
        <p>Type what you would actually say. Gold Set V1 can score responses already in the 120-case benchmark. New wording is deliberately left unscored until the AI evaluator is connected.</p>
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
        <textarea id="practice-answer-${lesson.id}" class="practice-answer" rows="3" autocomplete="off" spellcheck="false" placeholder="Type your Southern Vietnamese response…"></textarea>
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

  function renderUnknownResult(resultNode, scenario) {
    resultNode.innerHTML = `<div class="practice-feedback neutral">
      <div class="practice-feedback-head">
        <strong>Not in Gold Set V1 yet</strong>
        <span>Novel response</span>
      </div>
      <p>This local beta will not guess whether new wording is correct. The future AI evaluator will score novel answers against meaning, politeness, kinship language, naturalness, cultural fit and grammar.</p>
      <details>
        <summary>Show native-approved reference</summary>
        <p class="practice-reference">${esc(scenario.canonical)}</p>
      </details>
    </div>`;
  }

  function checkPractice(card) {
    const lessonId = Number(card.dataset.lessonId);
    const data = goldLesson(lessonId);
    const scenario = data?.scenarios?.find(item => item.scenarioId === card.dataset.scenarioId);
    if (!scenario) return;
    const input = card.querySelector(".practice-answer");
    const resultNode = card.querySelector("[data-practice-result]");
    const answer = normalizeVietnamese(input.value);
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

    if (matched) renderMatchedResult(resultNode, matched);
    else renderUnknownResult(resultNode, scenario);
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
    if (next) {
      nextScenario(next.closest("[data-southern-practice]"));
    }
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
