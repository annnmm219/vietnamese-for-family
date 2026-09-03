(() => {
  const baseRenderLesson = renderLesson;

  function renderSignals(lesson) {
    const cards = lesson.signals.map(item => `<article class="signal-card">
      <p class="signal-word">${esc(item[state.dialect])}</p>
      <p class="signal-meaning">${esc(item.meaning)}</p>
      <p class="signal-use">${esc(item.use)}</p>
    </article>`).join("");

    return `<section class="lesson-section lesson-eight-section">
      <div class="section-head">
        <p class="section-kicker">Part 1 · Catch the signal</p>
        <h2>You do not need every word.</h2>
        <p>Train yourself to notice a few strong anchors first. They tell you whether the family is asking about time, place, completion or what happens next.</p>
      </div>
      <div class="section-body">
        <div class="signal-grid">${cards}</div>
        <div class="listening-principle">
          <strong>Listening rule</strong>
          <span>Situation + 2 or 3 strong words is often enough to understand the question.</span>
        </div>
      </div>
    </section>`;
  }

  function renderSpeechExamples(lesson) {
    const examples = lesson.speechExamples.map((item, index) => `<article class="speech-strip">
      <div class="speech-strip-main">
        <span class="speech-index">${index + 1}</span>
        <div>
          <p class="speech-natural">${esc(item[state.dialect])}</p>
          <p class="speech-meaning">${esc(item.meaning)}</p>
        </div>
      </div>
      <details class="speech-explanation">
        <summary>What disappeared?</summary>
        <div class="speech-explanation-body">
          <span class="fuller-label">Fuller practice form</span>
          <p class="fuller-line">${esc(item.textbook)}</p>
          <p>${esc(item.note)}</p>
        </div>
      </details>
    </article>`).join("");

    return `<section class="lesson-section lesson-eight-section">
      <div class="section-head">
        <p class="section-kicker">Part 2 · Family speech gets shorter</p>
        <h2>Context does part of the sentence.</h2>
        <p>Read the short line first and understand the situation. Open the explanation only after you have guessed what the family member means.</p>
      </div>
      <div class="section-body">
        <div class="speech-stack">${examples}</div>
      </div>
    </section>`;
  }

  renderLesson = function () {
    const lesson = currentLesson();

    if (lesson.id !== 8 || lesson.type !== "listening") {
      baseRenderLesson();
      return;
    }

    renderCourseNav();
    renderHero();
    renderStatus();

    lessonRoot.innerHTML = [
      renderSignals(lesson),
      renderSpeechExamples(lesson),
      renderQuiz(lesson),
      renderScenario(lesson),
      renderCompletion(lesson)
    ].join("");
  };

  renderLesson();
})();
