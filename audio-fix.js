(() => {
  const BaseAudioContext = window.AudioContext || window.webkitAudioContext;
  const originalPlayLessonOneAudio = playLessonOneAudio;
  const originalStopActiveAudio = stopActiveAudio;
  let audioContext = null;
  let activeSource = null;
  let playGeneration = 0;
  const decodedBuffers = new Map();

  function cueText(cueId, dialect) {
    const lesson = currentLesson();
    if (!lesson || lesson.id !== 1) return "";

    if (cueId.startsWith("vocab-")) {
      const id = cueId.slice("vocab-".length);
      return lesson.vocabulary.find(item => item.id === id)?.[dialect] || "";
    }

    if (cueId.startsWith("phrase-")) {
      const id = cueId.slice("phrase-".length);
      return lesson.phrases.find(item => item.id === id)?.[dialect] || "";
    }

    if (cueId === "scenario") return lesson.scenario?.[dialect] || "";
    if (cueId === "scenario-reply") {
      const answer = lesson.scenario?.answers?.find(item => item.correct);
      return answer?.[dialect] || answer?.text || "";
    }
    if (cueId === "final") return dialect === "north" ? lesson.finalNorth : lesson.finalSouth;
    return "";
  }

  function chooseVietnameseVoice() {
    if (!("speechSynthesis" in window)) return null;
    const voices = speechSynthesis.getVoices();
    return voices.find(voice => /^vi(-|$)/i.test(voice.lang)) || null;
  }

  function speakNorthern(cueId, slow) {
    const text = cueText(cueId, "north");
    if (!text || !("speechSynthesis" in window)) {
      setAudioStatus("Northern audio is temporarily unavailable on this device.", true);
      return;
    }

    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "vi-VN";
    utterance.rate = slow ? (cueId.startsWith("vocab-") ? 0.55 : 0.7) : 0.9;
    utterance.pitch = 1;
    const voice = chooseVietnameseVoice();
    if (voice) utterance.voice = voice;

    utterance.onstart = () => setAudioStatus(`Playing Northern${slow ? " slowly" : ""}.`);
    utterance.onerror = () => setAudioStatus("Northern device voice could not start. Try again once the page has finished loading.", true);
    speechSynthesis.speak(utterance);
  }

  function getContext() {
    if (!BaseAudioContext) return null;
    if (!audioContext) audioContext = new BaseAudioContext();
    return audioContext;
  }

  async function getDecodedBuffer(dialect, group) {
    const src = LESSON_ONE_AUDIO[dialect]?.[group];
    if (!src) throw new Error("Missing audio source");

    if (!decodedBuffers.has(src)) {
      const context = getContext();
      decodedBuffers.set(src, (async () => {
        const response = await fetch(src, { cache: "force-cache" });
        if (!response.ok) throw new Error(`Audio HTTP ${response.status}`);
        const bytes = await response.arrayBuffer();
        return context.decodeAudioData(bytes.slice(0));
      })());
    }

    return decodedBuffers.get(src);
  }

  stopActiveAudio = function () {
    playGeneration += 1;
    if ("speechSynthesis" in window) speechSynthesis.cancel();

    if (activeSource) {
      try { activeSource.stop(); } catch (_) {}
      try { activeSource.disconnect(); } catch (_) {}
      activeSource = null;
    }

    originalStopActiveAudio();
  };

  playLessonOneAudio = async function (dialect, cueId, slow = false) {
    if (dialect === "north") {
      stopActiveAudio();
      speakNorthern(cueId, slow);
      return;
    }

    const cue = LESSON_ONE_CUES[dialect]?.[cueId];
    const context = getContext();
    if (!cue || !context) {
      originalPlayLessonOneAudio(dialect, cueId, slow);
      return;
    }

    const [group, start, end] = cue;
    const generation = ++playGeneration;

    if (activeSource) {
      try { activeSource.stop(); } catch (_) {}
      try { activeSource.disconnect(); } catch (_) {}
      activeSource = null;
    }
    originalStopActiveAudio();

    try {
      if (context.state === "suspended") await context.resume();
      const buffer = await getDecodedBuffer(dialect, group);
      if (generation !== playGeneration) return;

      const isVocabulary = cueId.startsWith("vocab-");
      const playbackRate = slow ? (isVocabulary ? 0.58 : 0.72) : 1;
      const leadIn = isVocabulary ? 0.12 : 0.10;
      const tail = isVocabulary ? 0.16 : 0.24;
      const offset = Math.max(0, start - leadIn);
      const requestedDuration = (end - start) + leadIn + tail;
      const duration = Math.min(requestedDuration, Math.max(0.05, buffer.duration - offset));

      const source = context.createBufferSource();
      source.buffer = buffer;
      source.playbackRate.value = playbackRate;
      source.connect(context.destination);
      activeSource = source;

      source.onended = () => {
        if (activeSource === source) {
          try { source.disconnect(); } catch (_) {}
          activeSource = null;
        }
      };

      setAudioStatus(`Playing ${dialectLabel(dialect)}${slow ? " slowly" : ""}.`);
      source.start(0, offset, duration);
    } catch (error) {
      if (generation !== playGeneration) return;
      setAudioStatus("Audio could not be decoded. Refresh once and try again.", true);
    }
  };

  renderVocabulary = function (lesson) {
    const cards = lesson.vocabulary.map(item => `<article class="vocab-card">
      <div class="vocab-top">
        <div>
          <h3 class="vocab-word">${esc(item[state.dialect])}</h3>
          <p class="vocab-meaning">${esc(item.meaning)}</p>
        </div>
        ${audioControl(lesson, `vocab-${item.id}`, true)}
      </div>
    </article>`).join("");

    return `<section class="lesson-section">
      <div class="section-head">
        <p class="section-kicker">Part 1 · Core language</p>
        <h2>Words you will actually hear.</h2>
        <p>Only the vocabulary for your selected regional track is shown. Use Slow when a short word is difficult to catch.</p>
      </div>
      <div class="section-body"><div class="vocab-grid">${cards}</div></div>
    </section>`;
  };

  renderLesson();
})();
