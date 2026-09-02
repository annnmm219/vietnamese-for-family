const STORAGE_KEYS = {
  dialect: "vff-primary-dialect",
  progress: "vff-lesson-01-progress",
  learnerName: "vff-learner-name"
};

const state = {
  dialect: localStorage.getItem(STORAGE_KEYS.dialect) || "south",
  completed: new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.progress) || "[]")),
  learnerName: localStorage.getItem(STORAGE_KEYS.learnerName) || ""
};

const checkpoints = ["quiz-1", "quiz-2", "quiz-3", "scenario"];
let activeAudio = null;

const vocabulary = [
  { id: "mom", meaning: "Mom / mother", north: "mẹ", south: "mẹ", note: { north: "Mẹ is standard and widely used in the North.", south: "Mẹ is widely understood. Má is also common in many Southern families, so ask your partner what their family uses." } },
  { id: "dad", meaning: "Dad / father", north: "bố", south: "ba", note: { north: "Bố is a common Northern family term for dad.", south: "Ba is a common Southern family term for dad." } },
  { id: "self-child", meaning: "You, when speaking to parents", north: "con", south: "con", note: { north: "With parents or parents-in-law, you commonly refer to yourself as con rather than tôi.", south: "With parents or parents-in-law, you commonly refer to yourself as con rather than tôi." } },
  { id: "grandfather", meaning: "Grandfather", north: "ông", south: "ông", note: { north: "For your partner's grandfather, you normally call him ông and yourself cháu.", south: "For your partner's grandfather, you normally call him ông and yourself cháu." } },
  { id: "grandmother", meaning: "Grandmother", north: "bà", south: "bà", note: { north: "For your partner's grandmother, you normally call her bà and yourself cháu.", south: "For your partner's grandmother, you normally call her bà and yourself cháu." } },
  { id: "polite-yes", meaning: "Polite acknowledgement", north: "vâng ạ", south: "dạ", note: { north: "Vâng and ạ are common polite markers. Dạ is also understood and used.", south: "Dạ is extremely useful for politely acknowledging an older person." } }
];

const basePhrases = [
  { id: "hello-mom", english: "Hello, Mom.", north: "Con chào mẹ ạ.", south: "Dạ, con chào mẹ." },
  { id: "hello-dad", english: "Hello, Dad.", north: "Con chào bố ạ.", south: "Dạ, con chào ba." },
  { id: "hello-grandparents", english: "Hello, Grandma and Grandpa.", north: "Cháu chào ông bà ạ.", south: "Dạ, cháu chào ông bà." },
  { id: "nice-to-meet", english: "I'm very happy to meet you both.", north: "Con rất vui được gặp bố mẹ ạ.", south: "Dạ, con rất vui được gặp ba mẹ." }
];

const root = document.getElementById("lesson-root");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");
const dialectSummary = document.getElementById("dialect-summary");
const audioStatus = document.getElementById("audio-status");

function esc(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function dialectLabel(dialect) { return dialect === "north" ? "Northern" : "Southern"; }
function otherDialect(dialect) { return dialect === "north" ? "south" : "north"; }
function audioPath(dialect, id, slow = false) { return `audio/${dialect}/lesson-01/${id}${slow ? "-slow" : ""}.mp3`; }

function setAudioStatus(message, isError = false) {
  if (!audioStatus) return;
  audioStatus.textContent = message;
  audioStatus.classList.toggle("audio-error", isError);
}

function playRegionalAudio(dialect, id, slow = false) {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio = null;
  }

  const src = audioPath(dialect, id, slow);
  const audio = new Audio(src);
  activeAudio = audio;
  setAudioStatus(`Playing ${dialectLabel(dialect)} regional audio.`);

  audio.addEventListener("error", () => {
    activeAudio = null;
    setAudioStatus(`${dialectLabel(dialect)} regional audio has not been generated yet. The app will not substitute a generic device voice.`, true);
  }, { once: true });

  audio.addEventListener("ended", () => { activeAudio = null; }, { once: true });
  audio.play().catch(() => {
    activeAudio = null;
    setAudioStatus(`Could not play the ${dialectLabel(dialect)} regional audio file.`, true);
  });
}

function audioButtons(id, dialect, includeSlow = false) {
  return `<div class="audio-actions">
    <button class="speak-button" type="button" data-audio-id="${esc(id)}" data-audio-dialect="${dialect}">🔊 ${dialectLabel(dialect)}</button>
    ${includeSlow ? `<button class="slow-button" type="button" data-audio-id="${esc(id)}" data-audio-dialect="${dialect}" data-slow="true">Slow</button>` : ""}
  </div>`;
}

function saveProgress() { localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify([...state.completed])); }
function markComplete(id) { state.completed.add(id); saveProgress(); updateProgress(); renderCompletionState(); }

function updateProgress() {
  const completedCount = checkpoints.filter(id => state.completed.has(id)).length;
  const percent = Math.round((completedCount / checkpoints.length) * 100);
  progressText.textContent = `${percent}%`;
  progressBar.style.width = `${percent}%`;
}

function updateDialectControls() {
  document.querySelectorAll(".dialect-button").forEach(button => {
    const active = button.dataset.dialect === state.dialect;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  dialectSummary.textContent = `You will practise ${dialectLabel(state.dialect)} Vietnamese and learn to recognise ${dialectLabel(otherDialect(state.dialect))} differences.`;
}

function renderVocabulary() {
  const cards = vocabulary.map(item => {
    const word = item[state.dialect];
    const alternate = item[otherDialect(state.dialect)];
    const differs = word !== alternate;
    return `<article class="vocab-card">
      <div class="vocab-top"><div><h3 class="vocab-word">${esc(word)}</h3><p class="vocab-meaning">${esc(item.meaning)}</p></div>${audioButtons(`vocab-${item.id}`, state.dialect)}</div>
      <p class="vocab-note">${esc(item.note[state.dialect])}${differs ? ` <strong>${dialectLabel(otherDialect(state.dialect))}:</strong> ${esc(alternate)}.` : ""}</p>
    </article>`;
  }).join("");

  return `<section class="lesson-section" id="family-words"><div class="section-head"><p class="section-kicker">Part 1 · Family language</p><h2>Do not start with “I” and “you.”</h2><p>Vietnamese family conversation depends heavily on relationships. Your first job is knowing what to call the person in front of you and what to call yourself.</p></div><div class="section-body"><div class="vocab-grid">${cards}</div></div></section>`;
}

function renderPhrases() {
  const learnerName = state.learnerName.trim() || "Alex";
  const staticCards = basePhrases.map(item => `<article class="phrase-card"><div><p class="phrase-vietnamese">${esc(item[state.dialect])}</p><p class="phrase-english">${esc(item.english)}</p></div>${audioButtons(`phrase-${item.id}`, state.dialect, true)}</article>`).join("");
  const namePhrase = `Con tên là ${learnerName}.`;

  return `<section class="lesson-section" id="greetings"><div class="section-head"><p class="section-kicker">Part 2 · At the door</p><h2>Five lines worth learning before the visit.</h2><p>Listen first, then repeat aloud. The fixed lesson phrases use regional recordings. Your personalised name sentence is text-only for now because it cannot be pre-generated for every name.</p></div><div class="section-body">
    <div class="name-row"><label>Your name<input id="learner-name" type="text" maxlength="30" value="${esc(state.learnerName)}" placeholder="e.g. Alex" autocomplete="given-name" /></label><span class="vocab-note">We use your name in the practice sentence.</span></div>
    <div class="phrase-list">${staticCards}<article class="phrase-card"><div><p class="phrase-vietnamese">${esc(namePhrase)}</p><p class="phrase-english">My name is ${esc(learnerName)}.</p></div><span class="vocab-note">Personalised audio coming later</span></article></div>
  </div></section>`;
}

function renderComparison() {
  const primary = state.dialect;
  const secondary = otherDialect(primary);
  const dad = vocabulary.find(item => item.id === "dad");
  const yes = vocabulary.find(item => item.id === "polite-yes");
  const card = (dialect, isPrimary) => `<article class="compare-card ${isPrimary ? "primary" : ""}"><span class="compare-label">${dialectLabel(dialect)}${isPrimary ? " · your speaking mode" : " · recognition mode"}</span><p class="compare-word">${esc(dad[dialect])}</p><p><strong>Dad:</strong> ${esc(dad[dialect])}</p><p><strong>Polite acknowledgement:</strong> ${esc(yes[dialect])}</p>${audioButtons("compare-dad-politeness", dialect)}</article>`;
  return `<section class="lesson-section" id="north-south"><div class="section-head"><p class="section-kicker">Part 3 · North + South</p><h2>Speak one. Recognise both.</h2><p>Now the audio changes too. Each card points to a recording generated with the matching regional voice.</p></div><div class="section-body"><div class="compare-grid">${card(primary, true)}${card(secondary, false)}</div><p class="culture-note"><strong>Important:</strong> Vietnamese varies by region and by family. “Southern” and “Northern” are useful learning labels, not rigid rules for every household.</p></div></section>`;
}

function quizQuestion(id, number, question, answers, explanation) {
  const done = state.completed.has(id);
  const options = answers.map(answer => `<button class="answer-button ${done && answer.correct ? "correct" : ""}" type="button" data-quiz="${id}" data-correct="${answer.correct}" ${done ? "disabled" : ""}>${esc(answer.text)}</button>`).join("");
  return `<article class="quiz-card" data-quiz-card="${id}"><span class="quiz-number">Question ${number}</span><p class="quiz-question">${esc(question)}</p><div class="answer-grid">${options}</div><p class="feedback ${done ? "success" : ""}">${done ? esc(explanation) : ""}</p></article>`;
}

function renderQuiz() {
  const dadCorrect = state.dialect === "north" ? "bố" : "ba";
  const dadWrong = state.dialect === "north" ? "ba" : "bố";
  const greetingCorrect = state.dialect === "north" ? "Con chào mẹ ạ." : "Dạ, con chào mẹ.";
  return `<section class="lesson-section" id="check-yourself"><div class="section-head"><p class="section-kicker">Part 4 · Check yourself</p><h2>Three things you should know before continuing.</h2><p>Wrong answers are part of the lesson. Pick the answer that sounds natural and respectful in this family context.</p></div><div class="section-body"><div class="quiz-list">
    ${quizQuestion("quiz-1", 1, "You meet your partner's mother. Which greeting fits your selected track?", [{ text: greetingCorrect, correct: true }, { text: "Tôi chào bạn.", correct: false }, { text: "Xin chào mẹ của bạn.", correct: false }], "Correct. The response uses the parent-child family relationship and an appropriate politeness pattern for this track.")}
    ${quizQuestion("quiz-2", 2, "When speaking directly to your partner's parents, what do you commonly call yourself?", [{ text: "con", correct: true }, { text: "tôi", correct: false }, { text: "bạn", correct: false }], "Correct. In this relationship, con is the natural family pronoun to learn first.")}
    ${quizQuestion("quiz-3", 3, `You chose ${dialectLabel(state.dialect)} Vietnamese. Which word are we teaching you to actively use for “Dad”?`, [{ text: dadCorrect, correct: true }, { text: dadWrong, correct: false }, { text: "ông", correct: false }], `Correct. Your speaking target is ${dadCorrect}; you should still recognise the other regional form.`)}
  </div></div></section>`;
}

function renderScenario() {
  const isNorth = state.dialect === "north";
  const motherLine = isNorth ? "Hai đứa mới tới à?" : "Hai đứa mới tới hả?";
  const correctReply = isNorth ? "Vâng ạ, bọn con mới tới." : "Dạ, tụi con mới tới.";
  const done = state.completed.has("scenario");
  const alternatives = [correctReply, "Tôi tới.", "Không biết."];
  return `<section class="lesson-section" id="mini-scenario"><div class="section-head"><p class="section-kicker">Final practice · The front door</p><h2>Your partner's mother opens the door.</h2><p>Do not translate every word. Understand the situation and choose a natural response.</p></div><div class="section-body"><div class="scenario" data-scenario-card>
    <div class="scenario-scene"><span class="scenario-speaker">Mother</span><p class="scenario-line">“${motherLine}”</p>${audioButtons("scenario-mother-arrival", state.dialect, true)}<p class="scenario-translation">Meaning: “You two just arrived?” / “Did you two just get here?”</p></div>
    <div class="scenario-actions"><p><strong>What do you say back?</strong></p>${alternatives.map((text, i) => `<button class="answer-button ${done && i === 0 ? "correct" : ""}" type="button" data-scenario-answer data-correct="${i === 0}" ${done ? "disabled" : ""}>${esc(text)}</button>`).join("")}<p class="feedback ${done ? "success" : ""}" data-scenario-feedback>${done ? "Good. You acknowledged her politely and answered as a couple." : ""}</p>${done ? audioButtons("scenario-reply", state.dialect, true) : ""}</div>
  </div></div></section>`;
}

function renderCompletion() {
  const finished = checkpoints.every(id => state.completed.has(id));
  const percent = Math.round((checkpoints.filter(id => state.completed.has(id)).length / checkpoints.length) * 100);
  return `<section class="completion-card" id="lesson-completion" data-completion-card><p class="section-kicker" style="color:#f0b8c2">Lesson 1</p><div class="completion-score">${percent}%</div><h2>${finished ? "You can enter the house." : "Finish the family check."}</h2><p>${finished ? "You can greet parents and grandparents, use con in the parent-child relationship, recognise a key North/South difference, and respond at the front door." : "Complete the three questions and the front-door scenario."}</p>${finished ? audioButtons("final-greeting", state.dialect, true) : ""}</section>`;
}

function renderCompletionState() {
  const completion = document.querySelector("[data-completion-card]");
  if (completion) completion.outerHTML = renderCompletion();
}

function renderLesson() {
  root.innerHTML = [renderVocabulary(), renderPhrases(), renderComparison(), renderQuiz(), renderScenario(), renderCompletion()].join("");
  updateDialectControls();
  updateProgress();
}

function handleQuizClick(button) {
  const id = button.dataset.quiz;
  const card = button.closest("[data-quiz-card]");
  const feedback = card.querySelector(".feedback");
  if (button.dataset.correct === "true") {
    button.classList.add("correct");
    card.querySelectorAll(".answer-button").forEach(answer => answer.disabled = true);
    const messages = {
      "quiz-1": "Correct. You used the family relationship and the politeness pattern taught in your selected track.",
      "quiz-2": "Correct. In this relationship, con is the natural family pronoun to learn first.",
      "quiz-3": `Correct. Your speaking target is ${state.dialect === "north" ? "bố" : "ba"}; you should still recognise the other regional form.`
    };
    feedback.textContent = messages[id];
    feedback.classList.add("success");
    markComplete(id);
  } else {
    button.classList.add("wrong");
    button.disabled = true;
    feedback.textContent = "Not this one. Try again and think about the family relationship, not just literal translation.";
  }
}

function handleScenarioClick(button) {
  const card = button.closest("[data-scenario-card]");
  const feedback = card.querySelector("[data-scenario-feedback]");
  if (button.dataset.correct === "true") {
    button.classList.add("correct");
    card.querySelectorAll("[data-scenario-answer]").forEach(answer => answer.disabled = true);
    feedback.textContent = "Good. You acknowledged her politely and answered as a couple.";
    feedback.classList.add("success");
    markComplete("scenario");
    renderLesson();
  } else {
    button.classList.add("wrong");
    button.disabled = true;
    feedback.textContent = "Understandable, but not the natural family response we are practising. Try again.";
  }
}

document.addEventListener("click", event => {
  const dialectButton = event.target.closest(".dialect-button");
  if (dialectButton) {
    state.dialect = dialectButton.dataset.dialect;
    localStorage.setItem(STORAGE_KEYS.dialect, state.dialect);
    setAudioStatus(`${dialectLabel(state.dialect)} selected. Audio buttons require the matching regional MP3 files.`);
    renderLesson();
    return;
  }

  const regionalAudioButton = event.target.closest("[data-audio-id]");
  if (regionalAudioButton) {
    playRegionalAudio(regionalAudioButton.dataset.audioDialect, regionalAudioButton.dataset.audioId, regionalAudioButton.dataset.slow === "true");
    return;
  }

  const quizButton = event.target.closest("[data-quiz]");
  if (quizButton) { handleQuizClick(quizButton); return; }

  const scenarioButton = event.target.closest("[data-scenario-answer]");
  if (scenarioButton) handleScenarioClick(scenarioButton);
});

document.addEventListener("input", event => {
  if (event.target.id !== "learner-name") return;
  state.learnerName = event.target.value;
  localStorage.setItem(STORAGE_KEYS.learnerName, state.learnerName);
  const cursor = event.target.selectionStart;
  renderLesson();
  const replacement = document.getElementById("learner-name");
  replacement.focus();
  replacement.setSelectionRange(cursor, cursor);
});

document.getElementById("reset-progress").addEventListener("click", () => {
  state.completed.clear();
  saveProgress();
  renderLesson();
  document.getElementById("top").scrollIntoView({ behavior: "smooth" });
});

setAudioStatus("Regional audio mode: the app will not substitute a generic device voice for Northern or Southern pronunciation.");
renderLesson();
