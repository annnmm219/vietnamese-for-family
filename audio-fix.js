(() => {
  let cueStopTimer = null;
  const baseStopActiveAudio = stopActiveAudio;

  stopActiveAudio = function () {
    if (cueStopTimer) {
      clearTimeout(cueStopTimer);
      cueStopTimer = null;
    }
    baseStopActiveAudio();
  };

  playLessonOneAudio = function (dialect, cueId, slow = false) {
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
    const playbackRate = slow ? 0.72 : 1;
    audio.playbackRate = playbackRate;

    // MP3 seeking is frame-based on mobile. Starting exactly on the authored
    // timestamp can shave off an initial consonant such as the c in "con".
    // A small lead-in lands us safely inside the silence before each cue.
    const leadIn = cueId === "vocab-self-child" ? 0.18 : 0.13;
    const tail = cueId.startsWith("phrase-") || cueId.startsWith("scenario") ? 0.30 : 0.18;
    const cueStart = Math.max(0, start - leadIn);
    const cueEnd = end + tail;
    const playbackMs = Math.max(250, ((cueEnd - cueStart) / playbackRate) * 1000 + 120);

    const startPlayback = () => {
      audio.currentTime = cueStart;
      setAudioStatus(`Playing ${dialectLabel(dialect)}${slow ? " slowly" : ""}.`);

      audio.play()
        .then(() => {
          cueStopTimer = setTimeout(() => {
            stopActiveAudio();
          }, playbackMs);
        })
        .catch(() => {
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
  };
})();
