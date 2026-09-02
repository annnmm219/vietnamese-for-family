const LESSONS = window.COURSE_LESSONS || [];

const STORAGE_KEYS = {
  dialect: "vff-primary-dialect",
  currentLesson: "vff-v2-current-lesson",
  progressPrefix: "vff-v2-progress-lesson-"
};

const state = {
  dialect: localStorage.getItem(STORAGE_KEYS.dialect) || "south",
  currentLesson: Number(localStorage.getItem(STORAGE_KEYS.currentLesson) || 1)
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
    "phrase-nice-to-meet": [11.02, 12.55], "scenario": [15.63, 16.72],
    "scenario-reply": [17.57, 19.22], "final": [19.99, 21.04]
  },
  south: {
    "vocab-mom": [0.00, 0.36], "vocab-dad": [0.69, 1.04], "vocab-self-child": [1.37, 1.72],
    "vocab-grandfather": [2.03, 2.35], "vocab-grandmother": [2.70, 3.09], "vocab-polite-yes": [3.45, 3.87],
    "phrase-hello-mom": [4.25, 5.61], "phrase-hello-dad": [6.39, 7.74], "phrase-hello-grandparents": [8.53, 10.13],
    "phrase-nice-to-meet": [10.90, 13.06], "scenario": [14.97, 16.04],
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

function currentLesson() {
  return LESSONS.find(lesson => lesson.id === state.currentLesson) || LESSONS[0];
}

function isReady(lesson) {
  return lesson.status === "ready";
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
  if (!isReady(lesson)) return [];
  return [...lesson.quizzes.map(q => `quiz-${q.id}`), "scenario"];
}

function progressPercent(lesson) {
  if (!isReady(lesson)) return 0;
  const checkpoints = checkpointsFor(lesson);
  const progress = getProgress(lesson.id);
  return Math.round((checkpoints.filter(id => progress.has(id)).length / checkpoints.length) * 100);
}

function isLessonComplete(lesson) {
  return isReady(lesson) && progressPercent(lesson) === 100;
}

function answerText(answer) {
  return answer.text || answer[state.dialect] || "";
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
    setAudioStatus(`No ${dialectLabel(dialect)} recording exists for this item yet.`, true);
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
      setAudioStatus("Lesson 1 audio still needs its master MP3 uploaded to GitHub.", true);
    });
  };

  if (audio.readyState >= 1) {
    startPlayback();
  } else {
    audio.addEventListener("loadedmetadata", startPlayback, { once: true });
    audio.addEventListener("error", () => {
      stopActiveAudio();
      setAudioStatus("Lesson 1 audio still needs its master MP3 uploaded to GitHub.", true);
    }, { once: true });
    audio.load();
  }
}

function audioControl(lesson, cueId, includeSlow = false) {
  if (!lesson.audioReady) return "";
  return `<div class="audio-actions">
    <button class="speak-button" type="button" data-audio-cue="${esc(cueId)}">🔊 Hear</button>
    ${includeSlow ? `<button class="slow-button" type="button" data-audio-cue="${esc(cueId)}" data-slow="true">Slow</button>` : ""}
  </div>`;
}

function renderCourseNav() {
  courseNav.innerHTML = LESSONS.map(lesson => {
    const active = lesson.id === state.currentLesson;
    const complete = isLessonComplete(lesson);
    const planned = !isReady(lesson);
    const meta = planned ? "Planned" : `${progressPercent(lesson)}% complete`;

    return `<button type="button" class="lesson-tab ${active ? "active" : ""} ${complete ? "complete" : ""} ${planned ? "planned" : ""}" data-lesson-id="${lesson.id}" aria-current="${active ? "page" : "false"}">
      <span class="lesson-tab-number">${complete ? "✓" : lesson.id}</span>
      <span class="lesson-tab-copy">
        <strong>${esc(lesson.shortTitle)}</strong>
        <small>${meta}</small>
      </span>
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

  dialectSummary.textContent = `You're learning ${dialectLabel(state.dialect)} Vietnamese.`;
}

function renderStatus() {
  const lesson = currentLesson();

  if (!isReady(lesson)) {
    progressText.textContent = "Planned";
    progressBar.style.width = "0%";
    resetButton.hidden = true;
    audioNote.hidden = false;
    setAudioStatus("Audio will be produced after this lesson's wording is built and locked.");
    return;
  }

  resetButton.hidden = false;
  const pct = progressPercent(lesson);
  progressText.textContent = `${pct}%`;
  progressBar.style.width = `${pct}%`;
  audioNote.hidden = false;

  if (lesson.audioReady) {
    setAudioStatus(`Lesson 1 uses the ${dialectLabel(state.dialect)} regional recording when the master MP3 is present.`);
  } else {
    setAudioStatus(`Lesson ${lesson.id} audio will be produced after the full curriculum is locked.`);
  }
}

function renderPlannedLesson(lesson) {
  return `<section class="lesson-section">
    <div class="section-head">
      <p class="section-kicker">Locked course position</p>
      <h2>Lesson ${lesson.id}: ${esc(lesson.title)}</h2>
      <p>This lesson's role in the final 10-lesson course is locked. The detailed phrase bank and drills have not been authored yet.</p>
    </div>
    <div class="section-body">
      <div class="phrase-list">
        <article class="phrase-card">
          <div>
            <p class="phrase-vietnamese">Core focus</p>
            <p class="phrase-english">${esc(lesson.coreFocus)}</p>
          </div>
        </article>
        <article class="phrase-card">
          <div>
            <p class="phrase-vietnamese">Learning goal</p>
            <p class="phrase-english">${esc(lesson.goal)}</p>
          </div>
        </article>
      </div>
    </div>
  </section>`;
}

function renderVocabulary(lesson) {
  const cards = lesson.vocabulary.map(item => `<article class="vocab-card">
    <div class="vocab-top">
      <div>
        <h3 class="vocab-word">${esc(item[state.dialect])}</h3>
        <p class="vocab-meaning">${esc(item.meaning)}</p>
      </div>
      ${audioControl(lesson, `vocab-${item.id}`)}
    </div>
  </article>`).join("");

  return `<section class="lesson-section">
    <div class="section-head">
      <p class="section-kicker">Part 1 · Core language</p>
      <h2>Words you will actually hear.</h2>
      <p>Only the vocabulary for your selected regional track is shown.</p>
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
      <h2>Keep the conversation moving.</h2>
      <p>Start with short family phrases. Open the pattern only when you want to build your own sentence.</p>
    </div>
    <div class="section-body">
      <div class="phrase-list">${cards}</div>
      <details class="pattern-card">
        <summary>Build your own sentence</summary>
        <div class="pattern-body">
          <span class="pattern-label">${esc(pattern.label)}</span>
          <p class="pattern-vietnamese">${esc(pattern[state.dialect])}</p>
          <p class="pattern-english">${esc(pattern.english)}</p>
          <small>Replace the part in brackets or ellipses.</small>
        </div>
      </details>
    </div>
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
      <p class="feedback ${done ? "success" : ""}">${done ? `✓ ${esc(quiz.explanation)}` : ""}</p>
    </article>`;
  }).join("");

  return `<section class="lesson-section">
    <div class="section-head">
      <p class="section-kicker">Part 3 · Check yourself</p>
      <h2>Choose what sounds natural.</h2>
      <p>Focus on the family situation, not word-for-word translation.</p>
    </div>
    <div class="section-body"><div class="quiz-list">${cards}</div></div>
  </section>`;
}

function renderScenario(lesson) {
  const progress = getProgress(lesson.id);
  const done = progress.has("scenario");
  const scenario = lesson.scenario;
  const answers = scenario.answers.map(answer => `<button class="answer-button ${done && answer.correct ? "correct" : ""}" type="button" data-scenario-answer data-correct="${answer.correct}" ${done ? "disabled" : ""}>${esc(answerText(answer))}</button>`).join("");

  return `<section class="lesson-section">
    <div class="section-head">
      <p class="section-kicker">Final practice</p>
      <h2>Handle a real family moment.</h2>
      <p>Read the situation, then choose the response you would actually use.</p>
    </div>
    <div class="section-body">
      <div class="scenario" data-scenario-card>
        <div class="scenario-scene">
          <span class="scenario-speaker">${esc(scenario.speaker)}</span>
          <p class="scenario-line">“${esc(scenario[state.dialect])}”</p>
          ${audioControl(lesson, "scenario", true)}
          <p class="scenario-translation">${esc(scenario.english)}</p>
        </div>
        <div class="scenario-actions">
          <p><strong>What do you say back?</strong></p>
          ${answers}
          <p class="feedback ${done ? "success" : ""}" data-scenario-feedback>${done ? `✓ ${esc(scenario.success)}` : ""}</p>
          ${done && lesson.audioReady ? audioControl(lesson, "scenario-reply", true) : ""}
        </div>
      </div>
    </div>
  </section>`;
}

function renderCompletion(lesson) {
  const pct = progressPercent(lesson);
  const finished = pct === 100;
  const nextLesson = LESSONS.find(item => item.id === lesson.id + 1);

  return `<section class="completion-card">
    <p class="section-kicker completion-kicker">Lesson ${lesson.id}</p>
    <div class="completion-score">${pct}%</div>
    <h2>${finished ? "Lesson complete." : "Almost there."}</h2>
    <p>${finished ? esc(lesson.outcome) : "Complete the three questions and final family scenario."}</p>
    <div class="completion-actions">
      ${finished && lesson.audioReady && lesson.finalNorth ? audioControl(lesson, "final", true) : ""}
      ${finished && nextLesson ? `<button type="button" class="next-lesson-button" data-lesson-id="${nextLesson.id}">Next lesson</button>` : ""}
    </div>
  </section>`;
}

function renderLesson() {
  const lesson = currentLesson();
  renderCourseNav();
  renderHero();
  renderStatus();

  if (!isReady(lesson)) {
    lessonRoot.innerHTML = renderPlannedLesson(lesson);
    return;
  }

  lessonRoot.innerHTML = [
    renderVocabulary(lesson),
    renderPhrases(lesson),
    renderQuiz(lesson),
    renderScenario(lesson),
    renderCompletion(lesson)
  ].join("");
}

function markComplete(checkpoint) {
  const lesson = currentLesson();
  if (!isReady(lesson)) return;
  const progress = getProgress(lesson.id);
  progress.add(checkpoint);
  saveProgress(lesson.id, progress);
  renderLesson();
}

function switchLesson(lessonId) {
  const lesson = LESSONS.find(item => item.id === lessonId);
  if (!lesson) return;
  stopActiveAudio();
  state.currentLesson = lessonId;
  localStorage.setItem(STORAGE_KEYS.currentLesson, String(lessonId));
  renderLesson();
  document.getElementById("top").scrollIntoView({ behavior: "smooth" });
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
    state.dialect = dialectButton.dataset.dialect;
    localStorage.setItem(STORAGE_KEYS.dialect, state.dialect);
    renderLesson();
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
      feedback.textContent = "↺ Try again. Focus on the relationship and tone, not just the literal words.";
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
      feedback.textContent = "↺ Try again. This response is understandable, but it is not the natural family choice this lesson is practising.";
      feedback.classList.remove("success");
      feedback.classList.add("error");
    }
  }
});

resetButton.addEventListener("click", () => {
  const lesson = currentLesson();
  if (!isReady(lesson)) return;
  localStorage.removeItem(progressKey(lesson.id));
  renderLesson();
});

if (!LESSONS.some(lesson => lesson.id === state.currentLesson)) state.currentLesson = 1;
renderLesson();
