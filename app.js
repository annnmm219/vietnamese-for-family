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

const LESSON_ONE_AUDIO = {
  north: {
    "vocab-a": "audio/north/lesson-01/vocab-a.mp3",
    "vocab-b": "audio/north/lesson-01/vocab-b.mp3",
    "phrases-a": "audio/north/lesson-01/phrases-a.mp3",
    "phrases-b": "audio/north/lesson-01/phrases-b.mp3",
    "scenario-a": "audio/north/lesson-01/scenario-a.mp3",
    "scenario-b": "audio/north/lesson-01/scenario-b.mp3"
  },
  south: {
    "vocab-a": "audio/south/lesson-01/vocab-a.mp3",
    "vocab-b": "audio/south/lesson-01/vocab-b.mp3",
    "phrases-a": "audio/south/lesson-01/phrases-a.mp3",
    "phrases-b1": "audio/south/lesson-01/phrases-b1.mp3",
    "phrases-b2": "audio/south/lesson-01/phrases-b2.mp3",
    "scenario-a": "audio/south/lesson-01/scenario-a.mp3",
    "scenario-b": "audio/south/lesson-01/scenario-b.mp3"
  }
};

const LESSON_ONE_CUES = {
  north: {
    "vocab-mom": ["vocab-a", 0.00, 0.38],
    "vocab-dad": ["vocab-a", 0.86, 1.47],
    "vocab-self-child": ["vocab-a", 1.89, 2.35],
    "vocab-grandfather": ["vocab-b", 0.00, 0.61],
    "vocab-grandmother": ["vocab-b", 1.02, 1.44],
    "vocab-polite-yes": ["vocab-b", 2.01, 2.52],
    "phrase-hello-mom": ["phrases-a", 0.00, 0.94],
    "phrase-hello-dad": ["phrases-a", 1.74, 2.65],
    "phrase-hello-grandparents": ["phrases-b", 0.00, 1.07],
    "phrase-nice-to-meet": ["phrases-b", 1.88, 3.41],
    "scenario": ["scenario-a", 0.00, 1.09],
    "scenario-reply": ["scenario-a", 1.94, 3.59],
    "final": ["scenario-b", 0.00, 1.05]
  },
  south: {
    "vocab-mom": ["vocab-a", 0.00, 0.36],
    "vocab-dad": ["vocab-a", 0.69, 1.04],
    "vocab-self-child": ["vocab-a", 1.37, 1.72],
    "vocab-grandfather": ["vocab-b", 0.00, 0.32],
    "vocab-grandmother": ["vocab-b", 0.67, 1.06],
    "vocab-polite-yes": ["vocab-b", 1.42, 1.84],
    "phrase-hello-mom": ["phrases-a", 0.00, 1.36],
    "phrase-hello-dad": ["phrases-a", 2.14, 3.49],
    "phrase-hello-grandparents": ["phrases-b1", 0.00, 1.60],
    "phrase-nice-to-meet": ["phrases-b2", 0.00, 2.16],
    "scenario": ["scenario-a", 0.00, 1.07],
    "scenario-reply": ["scenario-a", 1.84, 3.61],
    "final": ["scenario-b", 0.00, 1.56]
  }
};

const audioPlayers = new Map();
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
const installButton = document.getElementById("install-app");

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

function getAudio(src) {
  if (!audioPlayers.has(src)) {
    const audio = new Audio(src);
    audio.preload = "metadata";
    audioPlayers.set(src, audio);
  }
  return audioPlayers.get(src);
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
  const cue = LESSON_ONE_CUES[dialect]?.[cueId];
  if (!cue) {
    setAudioStatus(`No ${dialectLabel(dialect)} recording exists for this item yet.`, true);
    return;
  }

  const [group, start, end] = cue;
  const src = LESSON_ONE_AUDIO[dialect]?.[group];
  if (!src) {
    setAudioStatus(`No ${dialectLabel(dialect)} recording exists for this item yet.`, true);
    return;
  }

  stopActiveAudio();
  const audio = getAudio(src);
  activeAudio = audio;
  audio.playbackRate = slow ? 0.72 : 1;

  const startPlayback = () => {
    audio.currentTime = Math.max(0, start);
    activeTimeHandler = () => {
      if (audio.currentTime >= end) stopActiveAudio();
    };
    audio.addEventListener("timeupdate", activeTimeHandler);
    setAudioStatus(`Playing ${dialectLabel(dialect)}${slow ? " slowly" : ""}.`);
    audio.play().catch(() => {
      stopActiveAudio();
      setAudioStatus("Audio could not start. Tap the button again after the page finishes loading.", true);
    });
  };

  if (audio.readyState >= 1) {
    startPlayback();
  } else {
    const onError = () => {
      stopActiveAudio();
      setAudioStatus("Lesson 1 audio could not be loaded. Check your connection and refresh.", true);
    };
    audio.addEventListener("loadedmetadata", startPlayback, { once: true });
    audio.addEventListener("error", onError, { once: true });
    audio.load();
  }
}

function audioControl(lesson, cueId, includeSlow = false) {
  if (!lesson.audioReady) return "";
  return `<div class="audio-actions">
    <button class="speak-button" type="button" data-audio-cue="${esc(cueId)}" aria-label="Hear pronunciation">🔊 Hear</button>
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

  if (lesson.id === 1 && lesson.audioReady) {
    setAudioStatus(`Lesson 1 ${dialectLabel(state.dialect)} audio is ready. Tap Hear or Slow.`);
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

let deferredInstallPrompt = null;

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  if (installButton) installButton.hidden = false;
});

installButton?.addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installButton.hidden = true;
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  if (installButton) installButton.hidden = true;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // The course still works online if offline caching is unavailable.
    });
  });
}

if (!LESSONS.some(lesson => lesson.id === state.currentLesson)) state.currentLesson = 1;
renderLesson();
