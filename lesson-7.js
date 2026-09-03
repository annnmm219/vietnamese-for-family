(() => {
  const lesson = {
    id: 7,
    status: "ready",
    title: "Everyday Family Small Talk",
    shortTitle: "Small talk",
    eyebrow: "Keep quiet moments comfortable",
    hero: "Keep everyday family conversation moving without needing a big topic.",
    intro: "Most family time is not a big conversation. It is sitting together, commenting on the weather, checking whether someone is tired, and asking how things have been. This lesson gives you short responses and follow-up questions that keep those ordinary moments comfortable.",
    outcome: "Handle simple health and weather check-ins, describe how you feel, react naturally to what someone says, and add one small follow-up instead of ending the conversation with a single word.",
    audioReady: false,
    vocabulary: [
      { id: "well", meaning: "Well / healthy", north: "khỏe", south: "khỏe" },
      { id: "tired", meaning: "Tired", north: "mệt", south: "mệt" },
      { id: "busy", meaning: "Busy", north: "bận", south: "bận" },
      { id: "today", meaning: "Today", north: "hôm nay", south: "hôm nay" },
      { id: "hot", meaning: "Hot", north: "nóng", south: "nóng" },
      { id: "a-little", meaning: "A little / slightly", north: "hơi", south: "hơi" }
    ],
    phrases: [
      {
        id: "parents-health",
        english: "How have Mom and Dad been lately?",
        north: "Dạo này bố mẹ có khỏe không ạ?",
        south: "Dạ, dạo này ba mẹ có khỏe không?"
      },
      {
        id: "still-well",
        english: "I'm still doing well.",
        north: "Con vẫn khỏe ạ.",
        south: "Dạ, con vẫn khỏe."
      },
      {
        id: "little-tired",
        english: "I'm a little tired today.",
        north: "Hôm nay con hơi mệt ạ.",
        south: "Dạ, hôm nay con hơi mệt."
      },
      {
        id: "hot-today",
        english: "It's so hot today.",
        north: "Hôm nay nóng quá.",
        south: "Hôm nay nóng quá."
      },
      {
        id: "really",
        english: "Oh, really? / Is that so?",
        north: "Thế ạ?",
        south: "Dạ, vậy hả?"
      }
    ],
    pattern: {
      label: "Ask a simple check-in",
      north: "Dạo này [người] có [tính từ] không ạ?",
      south: "Dạ, dạo này [người] có [tính từ] không?",
      english: "Has [person] been [adjective] lately?"
    },
    quizzes: [
      {
        id: "q1",
        question: "Your partner's mother asks: ‘Dạo này con có mệt không?’. What is she checking?",
        answers: [
          { text: "Whether you have been tired lately", correct: true },
          { text: "Whether you have eaten today", correct: false },
          { text: "Where you are going tomorrow", correct: false }
        ],
        explanation: "Dạo này means lately, and mệt means tired. This is a casual wellbeing check-in."
      },
      {
        id: "q2",
        question: "Dad says: ‘Hôm nay nóng quá.’ Which reply keeps the small talk going naturally?",
        answers: [
          { north: "Vâng ạ, hôm nay nóng thật.", south: "Dạ, hôm nay nóng thiệt.", correct: true },
          { text: "Không.", correct: false },
          { text: "Con không biết.", correct: false }
        ],
        explanation: "You agree and add a tiny response. Small talk does not need to be clever; it just needs to keep the shared moment moving."
      },
      {
        id: "q3",
        question: "An aunt says: ‘Dạo này cô bận lắm.’ What is the best follow-up?",
        answers: [
          { north: "Thế ạ? Cô có mệt không ạ?", south: "Dạ, vậy hả? Cô có mệt không?", correct: true },
          { text: "Con không bận.", correct: false },
          { text: "Vâng.", correct: false }
        ],
        explanation: "A short reaction plus one related question shows that you are following her rather than waiting for your turn to speak."
      }
    ],
    scenario: {
      speaker: "Mother",
      north: "Dạo này công việc có bận không con?",
      south: "Dạo này công việc có bận không con?",
      english: "Has work been busy lately?",
      answers: [
        {
          north: "Cũng hơi bận ạ, nhưng con vẫn ổn.",
          south: "Dạ, cũng hơi bận, nhưng con vẫn ổn.",
          correct: true
        },
        { text: "Có.", correct: false },
        { text: "Không biết.", correct: false }
      ],
      success: "You answered the question, added one small detail, and reassured her that you are okay. That is enough to make ordinary family small talk feel natural."
    }
  };

  const lessons = window.COURSE_LESSONS || [];
  const index = lessons.findIndex(item => item.id === 7);
  if (index >= 0) lessons[index] = lesson;
  else lessons.push(lesson);
})();
