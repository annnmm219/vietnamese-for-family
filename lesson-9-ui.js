(() => {
  const baseRenderLesson = renderLesson;

  function renderVisitFlow(lesson) {
    const steps = lesson.visitSteps.map(step => `<article class="visit-step">
      <div class="visit-step-marker" aria-hidden="true">${step.number}</div>
      <div class="visit-step-content">
        <p class="visit-step-title">${esc(step.title)}</p>
        <p class="visit-step-line">${esc(step[state.dialect])}</p>
        <p class="visit-step-english">${esc(step.english)}</p>
        <details class="visit-note">
          <summary>Why this matters</summary>
          <p>${esc(step.note)}</p>
        </details>
      </div>
    </article>`).join("");

    return `<section class="lesson-section lesson-nine-section">
      <div class="section-head">
        <p class="section-kicker">Part 1 · The visit flow</p>
        <h2>Know the sequence, then follow the family.</h2>
        <p>This is a safe framework, not a universal ceremony. The household in front of you always outranks a memorised rule.</p>
      </div>
      <div class="section-body">
        <div class="visit-flow">${steps}</div>
      </div>
    </section>`;
  }

  function renderTetTerms(lesson) {
    const terms = lesson.keyTerms.map(term => `<article class="tet-term">
      <strong>${esc(term[state.dialect])}</strong>
      <span>${esc(term.meaning)}</span>
    </article>`).join("");

    return `<section class="lesson-section lesson-nine-section">
      <div class="section-head">
        <p class="section-kicker">Part 2 · Words worth recognising</p>
        <h2>Six signals you may hear during a visit.</h2>
        <p>You do not need a large holiday vocabulary. Recognise these words so you can follow what the family is doing.</p>
      </div>
      <div class="section-body">
        <div class="tet-term-grid">${terms}</div>
        <div class="household-note">
          <strong>Household rule</strong>
          <span>Shoes, gift placement, altar practice, when to open lì xì, and who leads each ritual can vary. Watch the family and ask when unsure.</span>
        </div>
      </div>
    </section>`;
  }

  renderLesson = function () {
    const lesson = currentLesson();

    if (lesson.id !== 9 || lesson.type !== "visit") {
      baseRenderLesson();
      return;
    }

    renderCourseNav();
    renderHero();
    renderStatus();

    lessonRoot.innerHTML = [
      renderVisitFlow(lesson),
      renderTetTerms(lesson),
      renderQuiz(lesson),
      renderScenario(lesson),
      renderCompletion(lesson)
    ].join("");
  };

  renderLesson();
})();
