(() => {
  const lessons = window.COURSE_LESSONS || [];

  // Lesson 9: tighten region-specific household and visit wording.
  const lesson9 = lessons.find(lesson => lesson.id === 9);
  if (lesson9) {
    const incense = lesson9.keyTerms?.find(term => term.north === "thắp hương" || term.south === "thắp hương");
    if (incense) {
      incense.north = "thắp hương";
      incense.south = "thắp nhang";
    }

    const leaveStep = lesson9.visitSteps?.find(step => step.number === 5);
    if (leaveStep) {
      leaveStep.north = "Bọn con xin phép bố mẹ về ạ.";
      leaveStep.south = "Dạ, tụi con xin phép ba mẹ về.";
    }
  }

  // Lesson 10: use the more natural everyday compliment verb in both tracks,
  // while preserving the regional sentence endings.
  const lesson10 = lessons.find(lesson => lesson.id === 10);
  if (lesson10) {
    const teasing = lesson10.quizzes?.find(quiz => quiz.id === "q4");
    if (teasing) {
      teasing.north = "Nói tiếng Việt giỏi thế, sắp thành người Việt rồi đấy!";
      teasing.south = "Nói tiếng Việt giỏi quá, sắp thành người Việt rồi đó!";
    }

    if (lesson10.scenario) {
      const correct = lesson10.scenario.answers?.find(answer => answer.correct);
      if (correct) {
        correct.north = "Vâng ạ, bọn con xin phép về. Con cảm ơn bố mẹ ạ.";
        correct.south = "Dạ, tụi con xin phép về. Con cảm ơn ba mẹ.";
      }
    }
  }
})();
