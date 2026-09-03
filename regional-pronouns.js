(() => {
  const lessons = window.COURSE_LESSONS || [];

  const lesson1 = lessons.find(lesson => lesson.id === 1);
  if (lesson1) {
    const grandparentsGreeting = lesson1.phrases?.find(item => item.id === "hello-grandparents");
    if (grandparentsGreeting) {
      grandparentsGreeting.north = "Cháu chào ông bà ạ.";
      grandparentsGreeting.south = "Dạ, con chào ông bà.";
    }

    // Current Lesson 1 audio was recorded before this regional pronoun
    // correction. Hide it until the final per-cue audio production pass so
    // visible Southern 'con' is never paired with an outdated 'cháu' clip.
    lesson1.audioReady = false;
  }

  const lesson9 = lessons.find(lesson => lesson.id === 9);
  if (lesson9) {
    const step1 = lesson9.visitSteps?.find(step => step.number === 1);
    const step2 = lesson9.visitSteps?.find(step => step.number === 2);
    const step4 = lesson9.visitSteps?.find(step => step.number === 4);

    if (step1) {
      step1.north = "Con chào bố mẹ ạ. Cháu chào ông bà ạ.";
      step1.south = "Dạ, con chào ba mẹ. Dạ, con chào ông bà.";
      step1.note = "For the course default, use cháu when speaking to grandparents in the Northern track and con in the Southern track. Keep the family hierarchy visible in the greeting.";
    }
    if (step2) {
      step2.north = "Cháu chúc ông bà năm mới mạnh khỏe, vui vẻ ạ.";
      step2.south = "Dạ, con chúc ông bà năm mới mạnh khỏe, vui vẻ.";
    }
    if (step4) {
      step4.north = "Cháu cảm ơn ông bà ạ.";
      step4.south = "Dạ, con cảm ơn ông bà.";
    }

    const quiz1 = lesson9.quizzes?.find(quiz => quiz.id === "q1");
    const quiz2 = lesson9.quizzes?.find(quiz => quiz.id === "q2");
    const quiz1Correct = quiz1?.answers?.find(answer => answer.correct);
    const quiz2Correct = quiz2?.answers?.find(answer => answer.correct);
    if (quiz1Correct) {
      quiz1Correct.north = "Cháu chào ông bà ạ.";
      quiz1Correct.south = "Dạ, con chào ông bà.";
    }
    if (quiz2Correct) {
      quiz2Correct.north = "Cháu cảm ơn bà ạ.";
      quiz2Correct.south = "Dạ, con cảm ơn bà.";
    }

    const scenarioCorrect = lesson9.scenario?.answers?.find(answer => answer.correct);
    if (scenarioCorrect) {
      scenarioCorrect.north = "Vâng ạ. Cháu chúc ông bà năm mới mạnh khỏe, vui vẻ ạ.";
      scenarioCorrect.south = "Dạ. Con chúc ông bà năm mới mạnh khỏe, vui vẻ.";
    }
  }
})();
