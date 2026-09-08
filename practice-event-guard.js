(() => {
  if (typeof switchLesson !== "function" || typeof currentLesson !== "function") return;

  const originalSwitchLesson = switchLesson;

  switchLesson = function guardedSwitchLesson(lessonId) {
    const targetId = Number(lessonId);
    const activeId = Number(currentLesson()?.id);

    // The Southern free-response card currently carries data-lesson-id for
    // its own state. The app-wide click delegate also uses that attribute for
    // lesson navigation. A tap anywhere inside the card therefore attempts to
    // "switch" to the lesson already on screen, which re-renders the DOM and
    // destroys textarea focus before iOS can open the keyboard.
    //
    // Switching to the lesson that is already active is unnecessary anyway,
    // so ignore same-lesson navigation globally. Actual navigation to another
    // lesson continues to use the original function.
    if (Number.isFinite(targetId) && targetId === activeId) return;

    return originalSwitchLesson(lessonId);
  };
})();
