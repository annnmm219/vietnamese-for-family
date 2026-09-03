(() => {
  const BaseAudioContext = window.AudioContext || window.webkitAudioContext;
  const originalPlayLessonOneAudio = playLessonOneAudio;
  const originalStopActiveAudio = stopActiveAudio;
  let audioContext = null;
  let activeSource = null;
  let playGeneration = 0;
  const decodedBuffers = new Map();

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

    if (activeSource) {
      try { activeSource.stop(); } catch (_) {}
      try { activeSource.disconnect(); } catch (_) {}
      activeSource = null;
    }

    originalStopActiveAudio();
  };

  playLessonOneAudio = async function (dialect, cueId, slow = false) {
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

      // Web Audio starts at an exact decoded sample rather than an MP3 seek frame.
      // Keep a small amount of silence around the authored cue so initials and
      // sentence endings are never shaved off.
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

  // Short Vietnamese words need a learner-speed option too. The previous UI
  // only offered Slow for phrases, which made words such as "con" unnecessarily
  // difficult to study.
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

  // Re-render once because app.js renders before this compatibility layer loads.
  renderLesson();
})();
