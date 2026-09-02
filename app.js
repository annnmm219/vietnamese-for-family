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

const vocabulary = [
  {
    id: "mom",
    meaning: "Mom / mother",
    north: "mẹ",
    south: "mẹ",
    note: {
      north: "Mẹ is standard and widely used in the North.",
      south: "Mẹ is widely understood. Má is also common in many Southern families, so ask your partner what their family actually uses."
    }
  },
  {
    id: "dad",
    meaning: "Dad / father",
    north: "bố",
    south: "ba",
    note: {
      north: "Bố is a common Northern family term for dad.",
      south: "Ba is a common Southern family term for dad."
    }
  },
  {
    id: "self-child",
    meaning: "You, when speaking to parents",
    north: "con",
    south: "con",
    note: {
      north: "With parents or parents-in-law, you commonly refer to yourself as con rather than tôi.",
      south: "With parents or parents-in-law, you commonly refer to yourself as con rather than tôi."
    }
  },
  {
    id: "grandfather",
    meaning: "Grandfather / older grandfather-generation man",
    north: "ông",
    south: "ông",
    note: {
      north: "For your partner's grandfather, you normally call him ông and yourself cháu.",
      south: "For your partner's grandfather, you normally call him ông and yourself cháu."
    }
  },
  {
    id: "grandmother",
    meaning: "Grandmother / older grandmother-generation woman",
    north: "bà",
    south: "bà",
    note: {
      north: "For your partner's grandmother, you normally call her bà and yourself cháu.",
      south: "For your partner's grandmother, you normally call her bà and yourself cháu."
    }
  },
  {
    id: "polite-yes",
    meaning: "Polite acknowledgement",
    north: "vâng ạ",
    south: "dạ",
    note: {
      north: "Vâng and ạ are common polite markers. Dạ is also understood and used.",
      south: "Dạ is extremely useful for politely acknowledging an older person."
    }
  }
];

const basePhrases = [
  {
    id: "hello-mom",
    english: "Hello, Mom.",
    north: "Con chào mẹ ạ.",
    south: "Con chào mẹ ạ."
  },
  {
    id: "hello-dad",
    english: "Hello, Dad.",
    north: "Con chào bố ạ.",
    south: "Con chào ba."
  },
  {
    id: "hello-grandparents",
    english: "Hello, Grandma and Grandpa.",
    north: "Cháu chào ông bà ạ.",
    south: "Cháu chào ông bà."
  },
  {
    id: "nice-to-meet",
    english: "I'm very happy to meet you both.",
    north: "Con rất vui được gặp bố mẹ ạ.",
    south: "Con rất vui được gặp ba mẹ."
  }
];

const root = document.getElementById("lesson-root");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");
const dialectSummary = document.getElementById("dialect-summary");

function esc(value) {
  return String(value)
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

function saveProgress() {
  localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify([...state.completed]));
}

function markComplete(id) {
  state.completed.add(id);
  saveProgress();
  updateProgress();
  renderCompletionState();
}

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

  const recognition = dialectLabel(otherDialect(state.dialect));
  dialectSummary.textContent = `You will practise ${dialectLabel(state.dialect)} Vietnamese and learn to recognise ${recognition} differences.`;
}

function getVietnameseVoice() {
  const voices = window.speechSynthesis?.getVoices?.() || [];
  return voices.find(voice => voice.lang?.toLowerCase().startsWith("vi")) || null;
}

function speak(text, slow = false) {
  if (!("speechSynthesis" in window)) {
    alert("Speech playback is not supported by this browser.");
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "vi-VN";
  utterance.rate = slow ? 0.68 : 0.9;
  const voice = getVietnameseVoice();
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

function renderVocabulary() {
  const cards = vocabulary.map(item => {
    const word = item[state.dialect];
    const alternate = item[otherDialect(state.dialect)];
    const differs = word !== alternate;

    return `
      <article class="vocab-card">
        <div class="vocab-top">
          <div>
            <h3 class="vocab-word">${esc(word)}</h3>
            <p class="vocab-meaning">${esc(item.meaning)}</p>
          </div>
          <button class="speak-button" type="button" data-speak="${esc(word)}" aria-label="Hear ${esc(word)}">🔊 Hear</button>
        </div>
        <p class="vocab-note">${esc(item.note[state.dialect])}${differs ? ` <strong>${dialectLabel(otherDialect(state.dialect))}:</strong> ${esc(alternate)}.` : ""}</p>
      </article>
    `;
  }).join("");

  return `
    <section class="lesson-section" id="family-words">
      <div class="section-head">
        <p class="section-kicker">Part 1 · Family language</p>
        <h2>Do not start with “I” and “you.”</h2>
        <p>Vietnamese family conversation depends heavily on relationships. Your first job is knowing what to call the person in front of you and what to call yourself.</p>
      </div>
      <div class="section-body">
        <div class="vocab-grid">${cards}</div>
      </div>
    </section>
  `;
}

function renderPhrases() {
  const learnerName = state.learnerName.trim() || "Alex";
  const namePhrase = `Con tên là ${learnerName}.`;

  const phraseCards = [
    ...basePhrases,
    {
      id: "my-name",
      english: `My name is ${learnerName}.`,
      north: namePhrase,
      south: namePhrase
    }
  ].map(item => {
    const text = item[state.dialect];
    return `
      <article class="phrase-card">
        <div>
          <p class="phrase-vietnamese">${esc(text)}</p>
          <p class="phrase-english">${esc(item.english)}</p>
        </div>
        <div class="audio-actions">
          <button class="speak-button" type="button" data-speak="${esc(text)}">🔊 Hear</button>
          <button class="slow-button" type="button" data-speak="${esc(text)}" data-slow="true">Slow</button>
        </div>
      </article>
    `;
  }).join("");

  return `
    <section class="lesson-section" id="greetings">
      <div class="section-head">
        <p class="section-kicker">Part 2 · At the door</p>
        <h2>Five lines worth learning before the visit.</h2>
        <p>Listen first, then repeat aloud. You do not need perfect tones on the first attempt. Aim for a recognisable phrase and the correct family relationship.</p>
      </div>
      <div class="section-body">
        <div class="name-row">
          <label>Your name
            <input id="learner-name" type="text" maxlength="30" value="${esc(state.learnerName)}" placeholder="e.g. Alex" autocomplete="given-name" />
          </label>
          <span class="vocab-note">We use your name in the practice sentence.</span>
        </div>
        <div class="phrase-list">${phraseCards}</div>
      </div>
    </section>
  `;
}

function renderComparison() {
  const primary = state.dialect;
  const secondary = otherDialect(primary);
  const dad = vocabulary.find(item => item.id === "dad");
  const yes = vocabulary.find(item => item.id === "polite-yes");

  const card = (dialect, isPrimary) => `
    <article class="compare-card ${isPrimary ? "primary" : ""}">
      <span class="compare-label">${dialectLabel(dialect)}${isPrimary ? " · your speaking mode" : " · recognition mode"}</span>
      <p class="compare-word">${esc(dad[dialect])}</p>
      <p><strong>Dad:</strong> ${esc(dad[dialect])}</p>
      <p><strong>Polite acknowledgement:</strong> ${esc(yes[dialect])}</p>
      <button class="speak-button" type="button" data-speak="${esc(`${dad[dialect]}. ${yes[dialect]}.`)}">🔊 Hear words</button>
    </article>
  `;

  return `
    <section class="lesson-section" id="north-south">
      <div class="section-head">
        <p class="section-kicker">Part 3 · North + South</p>
        <h2>Speak one. Recognise both.</h2>
        <p>You do not need to actively produce two dialects. Learn the vocabulary your family uses, while training your ear not to freeze when someone uses the other form.</p>
      </div>
      <div class="section-body">
        <div class="compare-grid">
          ${card(primary, true)}
          ${card(secondary, false)}
        </div>
        <p class="culture-note"><strong>Important:</strong> Vietnamese varies by region and by family. “Southern” and “Northern” are useful learning labels, not rigid rules for every household.</p>
      </div>
    </section>
  `;
}

function quizQuestion(id, number, question, answers, explanation) {
  const alreadyComplete = state.completed.has(id);
  const answerHtml = answers.map(answer => {
    const classes = alreadyComplete && answer.correct ? "answer-button correct" : "answer-button";
    return `<button class="${classes}" type="button" data-quiz="${id}" data-correct="${answer.correct}" ${alreadyComplete ? "disabled" : ""}>${esc(answer.text)}</button>`;
  }).join("");

  return `
    <article class="quiz-card" data-quiz-card="${id}">
      <span class="quiz-number">Question ${number}</span>
      <p class="quiz-question">${esc(question)}</p>
      <div class="answer-grid">${answerHtml}</div>
      <p class="feedback ${alreadyComplete ? "success" : ""}">${alreadyComplete ? esc(explanation) : ""}</p>
    </article>
  `;
}

function renderQuiz() {
  const dadCorrect = state.dialect === "north" ? "bố" : "ba";
  const dadWrong = state.dialect === "north" ? "ba" : "bố";

  return `
    <section class="lesson-section" id="check-yourself">
      <div class="section-head">
        <p class="section-kicker">Part 4 · Check yourself</p>
        <h2>Three things you should know before continuing.</h2>
        <p>Wrong answers are part of the lesson. Pick the answer that would sound natural and respectful in this family context.</p>
      </div>
      <div class="section-body">
        <div class="quiz-list">
          ${quizQuestion(
            "quiz-1",
            1,
            "You meet your partner's mother. Which greeting fits this lesson?",
            [
              { text: "Con chào mẹ ạ.", correct: true },
              { text: "Tôi chào bạn.", correct: false },
              { text: "Xin chào mẹ của bạn.", correct: false }
            ],
            "Correct. Con places you inside the family relationship, and ạ adds politeness."
          )}
          ${quizQuestion(
            "quiz-2",
            2,
            "When speaking directly to your partner's parents, what do you commonly call yourself?",
            [
              { text: "con", correct: true },
              { text: "tôi", correct: false },
              { text: "bạn", correct: false }
            ],
            "Correct. In this relationship, con is the natural family pronoun to learn first."
          )}
          ${quizQuestion(
            "quiz-3",
            3,
            `You chose ${dialectLabel(state.dialect)} Vietnamese. Which word are we teaching you to actively use for “Dad”?`,
            [
              { text: dadCorrect, correct: true },
              { text: dadWrong, correct: false },
              { text: "ông", correct: false }
            ],
            `Correct. Your speaking target is ${dadCorrect}; you should still recognise the other regional form.`
          )}
        </div>
      </div>
    </section>
  `;
}

function renderScenario() {
  const isNorth = state.dialect === "north";
  const motherLine = "Hai đứa mới tới à?";
  const correctReply = isNorth ? "Vâng ạ, bọn con mới tới." : "Dạ, tụi con mới tới.";
  const alternatives = isNorth
    ? [correctReply, "Tôi tới.", "Không biết."]
    : [correctReply, "Tôi tới.", "Không biết."];
  const done = state.completed.has("scenario");

  return `
    <section class="lesson-section" id="mini-scenario">
      <div class="section-head">
        <p class="section-kicker">Final practice · The front door</p>
        <h2>Your partner's mother opens the door.</h2>
        <p>Do not translate every word. Understand the situation and choose a natural response.</p>
      </div>
      <div class="section-body">
        <div class="scenario" data-scenario-card>
          <div class="scenario-scene">
            <span class="scenario-speaker">Mother</span>
            <p class="scenario-line">“${motherLine}”</p>
            <div class="audio-actions">
              <button class="speak-button" type="button" data-speak="${motherLine}">🔊 Hear</button>
              <button class="slow-button" type="button" data-speak="${motherLine}" data-slow="true">Slow</button>
            </div>
            <p class="scenario-translation">Meaning: “You two just arrived?” / “Did you two just get here?”</p>
          </div>
          <div class="scenario-actions">
            <p><strong>What do you say back?</strong></p>
            ${alternatives.map((text, index) => `<button class="answer-button ${done && index === 0 ? "correct" : ""}" type="button" data-scenario-answer data-correct="${index === 0}" ${done ? "disabled" : ""}>${esc(text)}</button>`).join("")}
            <p class="feedback ${done ? "success" : ""}" data-scenario-feedback>${done ? "Good. You acknowledged her politely and answered as a couple rather than using formal textbook tôi." : ""}</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderCompletion() {
  const finished = checkpoints.every(id => state.completed.has(id));
  const percent = Math.round((checkpoints.filter(id => state.completed.has(id)).length / checkpoints.length) * 100);

  return `
    <section class="completion-card" id="lesson-completion" data-completion-card>
      <p class="section-kicker" style="color:#f0b8c2">Lesson 1</p>
      <div class="completion-score">${percent}%</div>
      <h2>${finished ? "You can enter the house." : "Finish the family check."}</h2>
      <p>${finished
        ? "You can greet parents and grandparents, use con in the parent-child relationship, recognise a key North/South difference, and respond at the front door."
        : "Complete the three questions and the front-door scenario. Listening buttons are practice, not tests."
      }</p>
      ${finished ? `<button class="speak-button" type="button" data-speak="${state.dialect === "north" ? "Con chào bố mẹ ạ." : "Con chào ba mẹ."}">🔊 Hear your final greeting</button>` : ""}
    </section>
  `;
}

function renderCompletionState() {
  const completion = document.querySelector("[data-completion-card]");
  if (completion) completion.outerHTML = renderCompletion();
}

function renderLesson() {
  root.innerHTML = [
    renderVocabulary(),
    renderPhrases(),
    renderComparison(),
    renderQuiz(),
    renderScenario(),
    renderCompletion()
  ].join("");

  updateDialectControls();
  updateProgress();
}

function handleQuizClick(button) {
  const id = button.dataset.quiz;
  const card = button.closest("[data-quiz-card]");
  const feedback = card.querySelector(".feedback");
  const correct = button.dataset.correct === "true";

  if (correct) {
    button.classList.add("correct");
    card.querySelectorAll(".answer-button").forEach(answer => answer.disabled = true);

    const messages = {
      "quiz-1": "Correct. Con places you inside the family relationship, and ạ adds politeness.",
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
  const correct = button.dataset.correct === "true";

  if (correct) {
    button.classList.add("correct");
    card.querySelectorAll("[data-scenario-answer]").forEach(answer => answer.disabled = true);
    feedback.textContent = "Good. You acknowledged her politely and answered as a couple rather than using formal textbook tôi.";
    feedback.classList.add("success");
    markComplete("scenario");
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
    renderLesson();
    return;
  }

  const audioButton = event.target.closest("[data-speak]");
  if (audioButton) {
    speak(audioButton.dataset.speak, audioButton.dataset.slow === "true");
    return;
  }

  const quizButton = event.target.closest("[data-quiz]");
  if (quizButton) {
    handleQuizClick(quizButton);
    return;
  }

  const scenarioButton = event.target.closest("[data-scenario-answer]");
  if (scenarioButton) {
    handleScenarioClick(scenarioButton);
  }
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

if ("speechSynthesis" in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener?.("voiceschanged", () => window.speechSynthesis.getVoices());
}

renderLesson();
