(() => {
  const lesson = {
    id: 8,
    status: "ready",
    type: "listening",
    title: "Understanding Natural, Fast Vietnamese",
    shortTitle: "Fast Vietnamese",
    eyebrow: "Catch the meaning, not every syllable",
    hero: "Follow family Vietnamese even when the sentence sounds shorter than the textbook version.",
    intro: "Real family speech often leaves out pronouns, objects and information that everyone can already infer. Your job is not to decode every word. Learn to catch a few strong signals, use the situation, and understand what the speaker wants from you.",
    outcome: "Recognise high-value listening signals, understand common shortened family questions, infer omitted context, and respond without needing a word-for-word translation.",
    audioReady: false,
    signals: [
      { id: "yet", north: "chưa", south: "chưa", meaning: "yet? / not yet", use: "Often turns a short line into a question about whether something has happened." },
      { id: "already", north: "rồi", south: "rồi", meaning: "already / completed", use: "Signals that an action or change has happened." },
      { id: "where", north: "đâu", south: "đâu", meaning: "where", use: "A strong clue that the speaker is asking about a place or destination." },
      { id: "what-time", north: "mấy giờ", south: "mấy giờ", meaning: "what time", use: "Listen for this as a block instead of trying to process each word separately." },
      { id: "tomorrow", north: "mai", south: "mai", meaning: "tomorrow", use: "Often appears right at the start of a casual plan question." },
      { id: "return", north: "về", south: "về", meaning: "return / go home", use: "Frequently heard in questions about when someone is coming back." }
    ],
    speechExamples: [
      {
        north: "Ăn chưa con?",
        south: "Ăn chưa con?",
        meaning: "Have you eaten yet?",
        textbookNorth: "Con ăn cơm chưa?",
        textbookSouth: "Con ăn cơm chưa?",
        note: "The subject and even cơm can disappear because the situation makes them obvious. The signal chưa carries most of the question."
      },
      {
        north: "Mấy giờ về?",
        south: "Mấy giờ về?",
        meaning: "What time are you coming home?",
        textbookNorth: "Mấy giờ con về nhà?",
        textbookSouth: "Mấy giờ con về nhà?",
        note: "The speaker does not need to say con or nhà if they are already talking to you about coming home."
      },
      {
        north: "Mai đi đâu?",
        south: "Mai đi đâu?",
        meaning: "Where are you going tomorrow?",
        textbookNorth: "Ngày mai con định đi đâu?",
        textbookSouth: "Ngày mai con định đi đâu?",
        note: "Catch mai + đi + đâu. That is already enough to understand the topic and question."
      },
      {
        north: "Về rồi à?",
        south: "Về rồi hả?",
        meaning: "You're back already?",
        textbookNorth: "Con về rồi à?",
        textbookSouth: "Con về rồi hả?",
        note: "The person being spoken to is obvious, so the pronoun is dropped. Rồi tells you the return has already happened."
      },
      {
        north: "Ăn thêm không?",
        south: "Ăn thêm không?",
        meaning: "Do you want some more?",
        textbookNorth: "Con có muốn ăn thêm không?",
        textbookSouth: "Con có muốn ăn thêm không?",
        note: "At the table, nobody needs to repeat what food they mean. Context supplies the missing object."
      }
    ],
    quizzes: [
      {
        id: "q1",
        question: "Mother says: ‘Ăn chưa con?’. Which meaning should you catch immediately?",
        answers: [
          { text: "Have you eaten yet?", correct: true },
          { text: "Where are you eating?", correct: false },
          { text: "Do you want to cook?", correct: false }
        ],
        explanation: "Ăn gives you the food topic and chưa tells you she is checking whether it has happened yet."
      },
      {
        id: "q2",
        question: "Dad asks: ‘Mấy giờ về?’. Which information is omitted because the situation already supplies it?",
        answers: [
          { text: "The subject ‘you’ and nhà, ‘home’", correct: true },
          { text: "The time expression", correct: false },
          { text: "The action of returning", correct: false }
        ],
        explanation: "You already know he is speaking to you about your return, so Vietnamese can leave out both the subject and nhà."
      },
      {
        id: "q3",
        question: "You catch only three pieces from a quick question: ‘mai ... đi ... đâu’. What can you safely infer?",
        answers: [
          { text: "They are asking where you are going tomorrow", correct: true },
          { text: "They are asking whether you ate yesterday", correct: false },
          { text: "They are asking what time you woke up", correct: false }
        ],
        explanation: "You do not need the missing words. Mai + đi + đâu already gives you time, action and destination question."
      }
    ],
    scenario: {
      speaker: "Mother, calling from the kitchen",
      north: "Hai đứa ăn chưa? Chưa thì vào ăn nhé.",
      south: "Hai đứa ăn chưa? Chưa thì vô ăn nha.",
      english: "Have you two eaten? If not, come in and eat.",
      answers: [
        {
          north: "Vâng ạ, bọn con chưa ăn. Bọn con vào ngay ạ.",
          south: "Dạ, tụi con chưa ăn. Tụi con vô liền.",
          correct: true
        },
        { text: "Mấy giờ về?", correct: false },
        { text: "Con không hiểu chữ chưa.", correct: false }
      ],
      success: "You followed the important signals, understood the invitation, and answered the actual situation instead of trying to translate every word first."
    }
  };

  const lessons = window.COURSE_LESSONS || [];
  const index = lessons.findIndex(item => item.id === 8);
  if (index >= 0) lessons[index] = lesson;
  else lessons.push(lesson);
})();
