const LESSONS = window.COURSE_LESSONS || [];

const STORAGE_KEYS = {
  dialect: "vff-primary-dialect",
  currentLesson: "vff-current-lesson",
  progressPrefix: "vff-progress-lesson-"
};

const state = {
  dialect: localStorage.getItem(STORAGE_KEYS.dialect) || "south",
  currentLesson: Number(localStorage.getItem(STORAGE_KEYS.currentLesson) || 1)
};

const LESSON_SCENES = {
  1: { icon: "🏠", title: "Arriving at the family home", copy: "Scene slot for the front-door illustration in the next visual pass." },
  2: { icon: "🍲", title: "Family dinner", copy: "Scene slot for the meal-table illustration and future tappable food objects." },
  3: { icon: "💬", title: "Questions from relatives", copy: "Scene slot for the extended-family conversation illustration." },
  4: { icon: "💼", title: "Talking about work and plans", copy: "Scene slot for work, home and tomorrow-plan conversation cues." },
  5: { icon: "🧽", title: "Helping around the house", copy: "Scene slot for the kitchen and household-help illustration." }
};

const AUDIO_MASTERS = {
  north: "audio/north/lesson-01/master.mp3",
  south: "audio/south/lesson-01/master.mp3"
};

const AUDIO_CUES = {
  north: {
    "vocab-mom": [0.00, 0.38], "vocab-dad": [0.86, 1.47], "vocab-self-child": [1.89, 2.35],
    "vocab-grandfather": [2.79, 3.40], "vocab-grandmother": [3.81, 4.23], "vocab-polite-yes": [4.80, 5.31],
    "phrase-hello-mom": [5.72, 6.66], "phrase-hello-dad": [7.46, 8.37], "phrase-hello-grandparents": [9.14, 10.21],
    "phrase-nice-to-meet": [11.02, 12.55], "compare-0": [13.32, 14.80], "scenario": [15.63, 16.72],
    "scenario-reply": [17.57, 19.22], "final": [19.99, 21.04]
  },
  south: {
    "vocab-mom": [0.00, 0.36], "vocab-dad": [0.69, 1.04], "vocab-self-child": [1.37, 1.72],
    "vocab-grandfather": [2.03, 2.35], "vocab-grandmother": [2.70, 3.09], "vocab-polite-yes": [3.45, 3.87],
    "phrase-hello-mom": [4.25, 5.61], "phrase-hello-dad": [6.39, 7.74], "phrase-hello-grandparents": [8.53, 10.13],
    "phrase-nice-to-meet": [10.90, 13.06], "compare-0": [13.46, 14.58], "scenario": [14.97, 16.04],
    "scenario-reply": [16.81, 18.58], "final": [19.33, 20.89]
  }
};

const audioPlayers = Object.fromEntries(
  Object.entries(AUDIO_MASTERS).map(([dialect, src]) => {
    const audio = new Audio(src);
    audio.preload = "metadata";
    return [dialect, audio];
  })
);

let activeAudio = null;
let activeTimeHandler = null;

const courseNav = document.getElementById("course-nav");
const heroEyebrow = document.getElementById("hero-eyebrow");
const heroTitle = document.getElementById("hero-title");
const heroText = document.getElementById("hero-text");
const lessonBadge = document.getElementById("lesson-badge");
const lessonRoot = document.getElementById("lesson-root");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");
const dialectSummary = document.getElementById("dialect-summary");
const audioNote = document.getElementById("audio-note");
const audioStatus = document.getElementById("audio-status");
const resetButton = document.getElementById("reset-progress");

const vocabDialog = document.getElementById("vocab-dialog");
const vocabDialogClose = document.getElementById("vocab-dialog-close");
const vocabDialogTitle = document.getElementById("vocab-dialog-title");
const vocabDialogMeaning = document.getElementById("vocab-dialog-meaning");
const vocabDialogNorth = document.getElementById("vocab-dialog-north");
const vocabDialogSouth = document.getElementById("vocab-dialog-south");
const vocabDialogNote = document.getElementById("vocab-dialog-note");

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function dialectLabel(dialect) {
  return dialect === "north" ? "Northern" : "Southern";
}

function otherDialect(dialect) {
  return dialect === "north" ? "south" : "north";
}

function currentLesson() {
  return LESSONS.find(lesson => lesson.id === state.currentLesson) || LESSONS[0];
}

function progressKey(lessonId) {
  return `${STORAGE_KEYS.progressPrefix}${lessonId}`;
}

function getProgress(lessonId) {
  try {
    return new Set(JSON.parse(localStorage.getItem(progressKey(lessonId)) || "[]"));
  } catch {
    return new Set();
  }
}

function saveProgress(lessonId, progress) {
  localStorage.setItem(progressKey(lessonId), JSON.stringify([...progress]));
}

function checkpointsFor(lesson) {
  return [...lesson.quizzes.map(q => `quiz-${q.id}`), "scenario"];
}

function progressPercent(lesson) {
  const progress = getProgress(lesson.id);
  const checkpoints = checkpointsFor(lesson);
  return Math.round((checkpoints.filter(id => progress.has(id)).length / checkpoints.length) * 100);
}

function isLessonComplete(lesson) {
  return progressPercent(lesson) === 100;
}

function answerText(answer) {
  if (answer.text) return answer.text;
  return answer[state.dialect] || "";
}

function setAudioStatus(message, isError = false) {
  if (!audioStatus) return;
  audioStatus.textContent = message;
  audioStatus.classList.toggle("audio-error", isError);
}

function stopActiveAudio() {
  if (!activeAudio) return;
  if (activeTimeHandler) {
    activeAudio.removeEventListener("timeupdate", activeTimeHandler);
    activeTimeHandler = null;
  }
  activeAudio.pause();
  activeAudio = null;
}

function playLessonOneAudio(dialect, cueId, slow = false) {
  const cue = AUDIO_CUES[dialect]?.[cueId];
  const audio = audioPlayers[dialect];
  if (!cue || !audio) {
    setAudioStatus(`No ${dialectLabel(dialect)} audio cue exists for this item.`, true);
    return;
  }

  stopActiveAudio();
  activeAudio = audio;
  audio.playbackRate = slow ? 0.72 : 1;

  const startPlayback = () => {
    audio.currentTime = cue[0];
    activeTimeHandler = () => {
      if (audio.currentTime >= cue[1]) stopActiveAudio();
    };
    audio.addEventListener("timeupdate", activeTimeHandler);
    setAudioStatus(`Playing ${dialectLabel(dialect)}${slow ? " slowly" : ""}.`);
    audio.play().catch(() => {
      stopActiveAudio();
      setAudioStatus("Lesson 1 regional master audio is not uploaded yet. The curriculum can still be tested without it.", true);
    });
  };

  if (audio.readyState >= 1) {
    startPlayback();
  } else {
    audio.addEventListener("loadedmetadata", startPlayback, { once: true });
    audio.addEventListener("error", () => {
      stopActiveAudio();
      setAudioStatus("Lesson 1 regional master audio is not uploaded yet. The curriculum can still be tested without it.", true);
    }, { once: true });
    audio.load();
  }
}

function audioControl(lesson, cueId, includeSlow = false) {
  if (!lesson.audioReady) {
    return `<span class="audio-queued" title="Final audio will be generated after the curriculum is locked">Audio queued</span>`;
  }
  return `<div class="audio-actions">
    <button class="speak-button" type="button" data-audio-cue="${esc(cueId)}">🔊 ${dialectLabel(state.dialect)}</button>
    ${includeSlow ? `<button class="slow-button" type="button" data-audio-cue="${esc(cueId)}" data-slow="true">Slow</button>` : ""}
  </div>`;
}

function renderCourseNav() {
  courseNav.innerHTML = LESSONS.map(lesson => {
    const active = lesson.id === state.currentLesson;
    const complete = isLessonComplete(lesson);
    const pct = progressPercent(lesson);
    return `<button type="button" class="lesson-tab ${active ? "active" : ""} ${complete ? "complete" : ""}" data-lesson-id="${lesson.id}" aria-current="${active ? "page" : "false"}">
      <span class="lesson-tab-number">${complete ? "✓" : lesson.id}</span>
      <span class="lesson-tab-copy"><strong>${esc(lesson.shortTitle)}</strong><small>${pct}% complete</small></span>
    </button>`;
  }).join("");
}

function renderHero() {
  const lesson = currentLesson();
  heroEyebrow.textContent = lesson.eyebrow;
  heroTitle.textContent = lesson.hero;
  heroText.textContent = lesson.intro;
  lessonBadge.textContent = `Lesson ${lesson.id} · ${lesson.title}`;

  document.querySelectorAll(".dialect-button").forEach(button => {
    const active = button.dataset.dialect === state.dialect;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  dialectSummary.textContent = `Practise ${dialectLabel(state.dialect)} Vietnamese and learn to recognise ${dialectLabel(otherDialect(state.dialect))} differences.`;
}

function renderStatus() {
  const lesson = currentLesson();
  const pct = progressPercent(lesson);
  progressText.textContent = `${pct}%`;
  progressBar.style.width = `${pct}%`;

  audioNote.hidden = false;
  if (lesson.audioReady) {
    setAudioStatus("Lesson 1 uses separate HN and SG master recordings when those files are present in GitHub.");
  } else {
    setAudioStatus(`Lesson ${lesson.id} wording is still being locked. Final HN/SG audio will be produced in one batch after the curriculum is complete.`);
  }
}

function renderLessonVisual(lesson) {
  const scene = LESSON_SCENES[lesson.id] || { icon: "💬", title: lesson.title, copy: "Illustration slot reserved for the next visual pass." };
  return `<section class="lesson-visual" aria-label="${esc(scene.title)}">
    <div class="lesson-visual-icon" aria-hidden="true">${scene.icon}</div>
    <div class="lesson-visual-copy">
      <span>Scene preview</span>
      <strong>${esc(scene.title)}</strong>
      <p>${esc(scene.copy)}</p>
    </div>
  </section>`;
}

function renderVocabulary(lesson) {
  const cards = lesson.vocabulary.map(item => {
    const word = item[state.dialect];
    const other = item[otherDialect(state.dialect)];
    const differs = word !== other;
    const cue = differs
      ? `${dialectLabel(otherDialect(state.dialect))}: <strong>${esc(other)}</strong>`
      : "Same word in both tracks";

    return `<article class="vocab-card">
      <div class="vocab-top">
        <div>
          <h3 class="vocab-word">${esc(word)}</h3>
          <p class="vocab-meaning">${esc(item.meaning)}</p>
        </div>
        ${audioControl(lesson, `vocab-${item.id}`)}
      </div>
      <div class="vocab-card-footer">
        <span class="regional-cue">${cue}</span>
        <button class="vocab-detail-button" type="button" data-vocab-id="${esc(item.id)}">Details</button>
      </div>
    </article>`;
  }).join("");

  return `<section class="lesson-section">
    <div class="section-head">
      <p class="section-kicker">Part 1 · Core language</p>
      <h2>Words you will actually hear.</h2>
      <p>Keep the card simple. Tap Details when you want the family or regional explanation.</p>
    </div>
    <div class="section-body"><div class="vocab-grid">${cards}</div></div>
  </section>`;
}

function renderPhrases(lesson) {
  const cards = lesson.phrases.map(item => `<article class="phrase-card">
    <div>
      <p class="phrase-vietnamese">${esc(item[state.dialect])}</p>
      <p class="phrase-english">${esc(item.english)}</p>
    </div>
    ${audioControl(lesson, `phrase-${item.id}`, true)}
  </article>`).join("");

  const pattern = lesson.pattern;
  return `<section class="lesson-section">
    <div class="section-head">
      <p class="section-kicker">Part 2 · Useful lines</p>
      <h2>Say something useful, not something textbook-perfect.</h2>
      <p>Short lines first. Open the reusable pattern only when you want to build your own sentence.</p>
    </div>
    <div class="section-body">
      <div class="phrase-list">${cards}</div>
      <details class="pattern-card">
        <summary>Try a reusable pattern</summary>
        <div class="pattern-body">
          <span class="pattern-label">${esc(pattern.label)}</span>
          <p class="pattern-vietnamese">${esc(pattern[state.dialect])}</p>
          <p class="pattern-english">${esc(pattern.english)}</p>
          <small>Personalise the part in brackets or ellipses.</small>
        </div>
      </details>
    </div>
  </section>`;
}

function renderComparison(lesson) {
  const rows = lesson.comparison.map((item, index) => `<div class="comparison-row">
    <div><span>${esc(item.meaning)}</span></div>
    <div class="comparison-term ${state.dialect === "north" ? "active-term" : ""}"><small>Northern</small><strong>${esc(item.north)}</strong></div>
    <div class="comparison-term ${state.dialect === "south" ? "active-term" : ""}"><small>Southern</small><strong>${esc(item.south)}</strong></div>
    ${index === 0 ? audioControl(lesson, "compare-0") : ""}
  </div>`).join("");

  return `<section class="lesson-section">
    <div class="section-head">
      <p class="section-kicker">Part 3 · North + South</p>
      <h2>Speak one. Recognise both.</h2>
      <p>Your active track is highlighted. Recognition matters because real families mix regions, generations and habits.</p>
    </div>
    <div class="section-body"><div class="comparison-table">${rows}</div></div>
  </section>`;
}

function renderQuiz(lesson) {
  const progress = getProgress(lesson.id);
  const cards = lesson.quizzes.map((quiz, index) => {
    const checkpoint = `quiz-${quiz.id}`;
    const done = progress.has(checkpoint);
    const options = quiz.answers.map(answer => `<button class="answer-button ${done && answer.correct ? "correct" : ""}" type="button" data-quiz-id="${esc(quiz.id)}" data-correct="${answer.correct}" ${done ? "disabled" : ""}>${esc(answerText(answer))}</button>`).join("");

    return `<article class="quiz-card" data-quiz-card="${esc(quiz.id)}">
      <span class="quiz-number">Question ${index + 1}</span>
      <p class="quiz-question">${esc(quiz.question)}</p>
      <div class="answer-grid">${options}</div>
      <p class="feedback ${done ? "success" : ""}">${done ? `✓ Correct. ${esc(quiz.explanation)}` : ""}</p>
    </article>`;
  }).join("");

  return `<section class="lesson-section">
    <div class="section-head">
      <p class="section-kicker">Part 4 · Check yourself</p>
      <h2>Understand the situation, not every word.</h2>
      <p>Feedback now tells you immediately whether the issue is language, relationship or tone.</p>
    </div>
    <div class="section-body"><div class="quiz-list">${cards}</div></div>
  </section>`;
}

function renderScenario(lesson) {
  const progress = getProgress(lesson.id);
  const done = progress.has("scenario");
  const scenario = lesson.scenario;
  const line = scenario[state.dialect];
  const answers = scenario.answers.map(answer => `<button class="answer-button ${done && answer.correct ? "correct" : ""}" type="button" data-scenario-answer data-correct="${answer.correct}" ${done ? "disabled" : ""}>${esc(answerText(answer))}</button>`).join("");

  return `<section class="lesson-section">
    <div class="section-head">
      <p class="section-kicker">Final practice · Family scenario</p>
      <h2>Respond without asking your partner to rescue you.</h2>
      <p>Read the situation first. Then choose the response that keeps the interaction natural.</p>
    </div>
    <div class="section-body"><div class="scenario" data-scenario-card>
      <div class="scenario-scene">
        <span class="scenario-speaker">${esc(scenario.speaker)}</span>
        <p class="scenario-line">“${esc(line)}”</p>
        ${audioControl(lesson, "scenario", true)}
        <p class="scenario-translation">${esc(scenario.english)}</p>
      </div>
      <div class="scenario-actions">
        <p><strong>What do you say back?</strong></p>
        ${answers}
        <p class="feedback ${done ? "success" : ""}" data-scenario-feedback>${done ? `✓ Good choice. ${esc(scenario.success)}` : ""}</p>
        ${done && lesson.audioReady ? audioControl(lesson, "scenario-reply", true) : ""}
      </div>
    </div></div>
  </section>`;
}

function renderCompletion(lesson) {
  const pct = progressPercent(lesson);
  const finished = pct === 100;
  const nextLesson = LESSONS.find(item => item.id === lesson.id + 1);

  return `<section class="completion-card">
    <p class="section-kicker" style="color:#f0b8c2">Lesson ${lesson.id}</p>
    <div class="completion-score">${pct}%</div>
    <h2>${finished ? "Lesson complete." : "Finish the family check."}</h2>
    <p>${finished ? esc(lesson.outcome) : "Complete the three questions and the final family scenario."}</p>
    <div class="completion-actions">
      ${finished && lesson.audioReady && lesson.finalNorth ? audioControl(lesson, "final", true) : ""}
      ${finished && nextLesson ? `<button type="button" class="next-lesson-button" data-lesson-id="${nextLesson.id}">Next: Lesson ${nextLesson.id}</button>` : ""}
    </div>
  </section>`;
}

function renderLesson() {
  const lesson = currentLesson();
  renderCourseNav();
  renderHero();
  renderStatus();

  lessonRoot.innerHTML = [
    renderLessonVisual(lesson),
    renderVocabulary(lesson),
    renderPhrases(lesson),
    renderComparison(lesson),
    renderQuiz(lesson),
    renderScenario(lesson),
    renderCompletion(lesson)
  ].join("");
}

function markComplete(checkpoint) {
  const lesson = currentLesson();
  const progress = getProgress(lesson.id);
  progress.add(checkpoint);
  saveProgress(lesson.id, progress);
  renderLesson();
}

function switchLesson(lessonId) {
  const lesson = LESSONS.find(item => item.id === lessonId);
  if (!lesson) return;
  stopActiveAudio();
  if (vocabDialog?.open) vocabDialog.close();
  state.currentLesson = lessonId;
  localStorage.setItem(STORAGE_KEYS.currentLesson, String(lessonId));
  renderLesson();
  document.getElementById("top").scrollIntoView({ behavior: "smooth" });
}

function openVocabDetails(vocabId) {
  const lesson = currentLesson();
  const item = lesson.vocabulary.find(vocab => vocab.id === vocabId);
  if (!item || !vocabDialog) return;

  const note = state.dialect === "north" ? item.noteNorth : item.noteSouth;
  vocabDialogTitle.textContent = item[state.dialect];
  vocabDialogMeaning.textContent = item.meaning;
  vocabDialogNorth.textContent = item.north;
  vocabDialogSouth.textContent = item.south;
  vocabDialogNote.textContent = `${dialectLabel(state.dialect)} track: ${note}`;
  vocabDialog.showModal();
}

document.addEventListener("click", event => {
  const lessonButton = event.target.closest("[data-lesson-id]");
  if (lessonButton) {
    switchLesson(Number(lessonButton.dataset.lessonId));
    return;
  }

  const dialectButton = event.target.closest(".dialect-button");
  if (dialectButton) {
    stopActiveAudio();
    if (vocabDialog?.open) vocabDialog.close();
    state.dialect = dialectButton.dataset.dialect;
    localStorage.setItem(STORAGE_KEYS.dialect, state.dialect);
    renderLesson();
    return;
  }

  const vocabButton = event.target.closest("[data-vocab-id]");
  if (vocabButton) {
    openVocabDetails(vocabButton.dataset.vocabId);
    return;
  }

  const audioButton = event.target.closest("[data-audio-cue]");
  if (audioButton) {
    playLessonOneAudio(state.dialect, audioButton.dataset.audioCue, audioButton.dataset.slow === "true");
    return;
  }

  const quizButton = event.target.closest("[data-quiz-id]");
  if (quizButton) {
    const lesson = currentLesson();
    const quiz = lesson.quizzes.find(item => item.id === quizButton.dataset.quizId);
    const card = quizButton.closest("[data-quiz-card]");
    const feedback = card.querySelector(".feedback");

    if (quizButton.dataset.correct === "true") {
      markComplete(`quiz-${quiz.id}`);
    } else {
      quizButton.classList.add("wrong");
      quizButton.disabled = true;
      feedback.textContent = "↺ Try again. The problem is the relationship or tone, not just the literal words.";
      feedback.classList.remove("success");
      feedback.classList.add("error");
    }
    return;
  }

  const scenarioButton = event.target.closest("[data-scenario-answer]");
  if (scenarioButton) {
    const feedback = scenarioButton.closest("[data-scenario-card]").querySelector("[data-scenario-feedback]");
    if (scenarioButton.dataset.correct === "true") {
      markComplete("scenario");
    } else {
      scenarioButton.classList.add("wrong");
      scenarioButton.disabled = true;
      feedback.textContent = "↺ Try again. Understandable, but this response is not the natural family choice the lesson is practising.";
      feedback.classList.remove("success");
      feedback.classList.add("error");
    }
  }
});

vocabDialogClose?.addEventListener("click", () => vocabDialog.close());
vocabDialog?.addEventListener("click", event => {
  if (event.target === vocabDialog) vocabDialog.close();
});

resetButton.addEventListener("click", () => {
  localStorage.removeItem(progressKey(currentLesson().id));
  renderLesson();
});

if (!LESSONS.some(lesson => lesson.id === state.currentLesson)) state.currentLesson = 1;
renderLesson();