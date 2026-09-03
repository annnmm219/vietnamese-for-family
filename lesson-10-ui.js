(() => {
  const baseRenderLesson = renderLesson;

  function renderCapstoneIntro(lesson) {
    const skills = lesson.skills.map(skill => `<span class="capstone-skill">${esc(skill)}</span>`).join("");
    return `<section class="capstone-brief">
      <p class="section-kicker">Capstone · Lessons 1–9 together</p>
      <h2>No new vocabulary. Just the family.</h2>
      <p>Move through the gathering one moment at a time. There is no need for a perfect sentence; choose the response that fits the person, the context and the tone.</p>
      <div class="capstone-skills">${skills}</div>
    </section>`;
  }

  function renderJourney(lesson, progress) {
    const checkpoints = [
      ...lesson.quizzes.map(quiz => ({ id: `quiz-${quiz.id}`, label: quiz.title })),
      { id: "scenario", label: lesson.scenario.title }
    ];

    const items = checkpoints.map((item, index) => {
      const done = progress.has(item.id);
      const firstOpen = !done && checkpoints.slice(0, index).every(previous => progress.has(previous.id));
      return `<div class="capstone-journey-step ${done ? "done" : ""} ${firstOpen ? "current" : ""}">
        <span>${done ? "✓" : index + 1}</span>
        <small>${esc(item.label)}</small>
      </div>`;
    }).join("");

    return `<section class="capstone-journey" aria-label="Family gathering progress">${items}</section>`;
  }

  function renderCrowd(quiz) {
    if (!quiz.crowd) return "";
    const lines = quiz.crowd.map(item => `<div class="crowd-line">
      <span>${esc(item.speaker)}</span>
      <div>
        <strong>${esc(item[state.dialect])}</strong>
        <small>${esc(item.english)}</small>
      </div>
    </div>`).join("");
    return `<div class="crowd-stack">${lines}</div>`;
  }

  function renderQuizScene(quiz) {
    const answers = quiz.answers.map(answer => `<button class="answer-button" type="button" data-quiz-id="${esc(quiz.id)}" data-correct="${answer.correct}">${esc(answerText(answer))}</button>`).join("");
    const singleLine = quiz.crowd ? "" : `<div class="capstone-dialogue">
      <span class="scenario-speaker">${esc(quiz.speaker)}</span>
      <p class="capstone-line">“${esc(quiz[state.dialect])}”</p>
      <p class="scenario-translation">${esc(quiz.english)}</p>
    </div>`;

    return `<section class="capstone-scene" data-quiz-card="${esc(quiz.id)}">
      <div class="capstone-scene-head">
        <span>Scene ${quiz.scene} of 7</span>
        <h2>${esc(quiz.title)}</h2>
      </div>
      ${singleLine}
      ${renderCrowd(quiz)}
      <div class="capstone-choice">
        <p class="capstone-question">${esc(quiz.question)}</p>
        <div class="answer-grid">${answers}</div>
        <p class="feedback"></p>
      </div>
    </section>`;
  }

  function renderFinalScene(scenario) {
    const answers = scenario.answers.map(answer => `<button class="answer-button" type="button" data-scenario-answer data-correct="${answer.correct}">${esc(answerText(answer))}</button>`).join("");

    return `<section class="capstone-scene capstone-final" data-scenario-card>
      <div class="capstone-scene-head">
        <span>Scene 7 of 7 · Final moment</span>
        <h2>${esc(scenario.title)}</h2>
      </div>
      <div class="capstone-dialogue">
        <span class="scenario-speaker">${esc(scenario.speaker)}</span>
        <p class="capstone-line">“${esc(scenario[state.dialect])}”</p>
        <p class="scenario-translation">${esc(scenario.english)}</p>
      </div>
      <div class="capstone-choice">
        <p class="capstone-question">How do you close the visit?</p>
        <div class="answer-grid">${answers}</div>
        <p class="feedback" data-scenario-feedback></p>
      </div>
    </section>`;
  }

  renderLesson = function () {
    const lesson = currentLesson();

    if (lesson.id !== 10 || lesson.type !== "capstone") {
      baseRenderLesson();
      return;
    }

    renderCourseNav();
    renderHero();
    renderStatus();

    const progress = getProgress(lesson.id);
    const currentQuiz = lesson.quizzes.find(quiz => !progress.has(`quiz-${quiz.id}`));
    let activeStage;

    if (currentQuiz) {
      activeStage = renderQuizScene(currentQuiz);
    } else if (!progress.has("scenario")) {
      activeStage = renderFinalScene(lesson.scenario);
    } else {
      activeStage = renderCompletion(lesson);
    }

    lessonRoot.innerHTML = [
      renderCapstoneIntro(lesson),
      renderJourney(lesson, progress),
      activeStage
    ].join("");
  };

  renderLesson();
})();
