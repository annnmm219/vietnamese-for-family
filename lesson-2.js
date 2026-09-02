(() => {
  const lesson = {
    id: 2,
    status: "ready",
    title: "Politeness & Natural Responses",
    shortTitle: "Politeness",
    eyebrow: "Sound warm from the start",
    hero: "Say less, but make every response sound respectful and natural.",
    intro: "Vietnamese family speech often sounds warm because of small words around the main message. This lesson teaches the acknowledgements, softeners and polite response patterns you will use in almost every lesson after this one.",
    outcome: "Acknowledge older relatives naturally, accept or decline without sounding abrupt, recognise common sentence softeners, and recover politely when you do not understand.",
    audioReady: false,
    vocabulary: [
      {
        id: "acknowledge",
        meaning: "Polite yes / acknowledgement",
        north: "vâng ạ",
        south: "dạ"
      },
      {
        id: "softener",
        meaning: "Gentle sentence softener",
        north: "nhé",
        south: "nha"
      },
      {
        id: "polite-decline",
        meaning: "Polite 'no thanks' opening",
        north: "thôi ạ",
        south: "dạ thôi"
      },
      {
        id: "thank-you",
        meaning: "Thank you",
        north: "cảm ơn",
        south: "cảm ơn"
      },
      {
        id: "sorry",
        meaning: "Sorry / excuse me",
        north: "xin lỗi",
        south: "xin lỗi"
      },
      {
        id: "understand",
        meaning: "Understand",
        north: "hiểu",
        south: "hiểu"
      }
    ],
    phrases: [
      {
        id: "yes-thanks",
        english: "Yes, thank you, Mom.",
        north: "Vâng ạ, con cảm ơn mẹ.",
        south: "Dạ, con cảm ơn mẹ."
      },
      {
        id: "no-thanks",
        english: "No thank you, Mom.",
        north: "Thôi ạ, con cảm ơn mẹ.",
        south: "Dạ thôi, con cảm ơn mẹ."
      },
      {
        id: "understood",
        english: "Yes, I understand now.",
        north: "Vâng ạ, con hiểu rồi.",
        south: "Dạ, con hiểu rồi."
      },
      {
        id: "will-do",
        english: "Okay, I'll do it.",
        north: "Vâng ạ, để con làm.",
        south: "Dạ, để con làm."
      },
      {
        id: "didnt-hear",
        english: "Sorry, I didn't hear clearly.",
        north: "Con xin lỗi ạ, con chưa nghe rõ.",
        south: "Dạ, con xin lỗi, con chưa nghe rõ."
      }
    ],
    pattern: {
      label: "Make a short answer warmer",
      north: "[câu trả lời] + ạ.",
      south: "Dạ, + [câu trả lời].",
      english: "Add the respectful marker around a short answer instead of answering with a bare word."
    },
    quizzes: [
      {
        id: "q1",
        question: "Your partner's mother offers you tea, but you do not want any. Which response fits your selected track?",
        answers: [
          {
            north: "Thôi ạ, con cảm ơn mẹ.",
            south: "Dạ thôi, con cảm ơn mẹ.",
            correct: true
          },
          { text: "Không.", correct: false },
          { text: "Không uống.", correct: false }
        ],
        explanation: "The answer declines clearly but still acknowledges the offer and the relationship."
      },
      {
        id: "q2",
        question: "When you hear nhé / nha at the end of a family sentence, what is it usually doing here?",
        answers: [
          { text: "Making the request or suggestion sound gentler", correct: true },
          { text: "Changing the sentence into the past tense", correct: false },
          { text: "Meaning that the speaker is angry", correct: false }
        ],
        explanation: "In these family examples, nhé / nha helps soften a suggestion, reminder or request."
      },
      {
        id: "q3",
        question: "An older relative says something you did not hear clearly. What is the safest response?",
        answers: [
          {
            north: "Con xin lỗi ạ, con chưa nghe rõ.",
            south: "Dạ, con xin lỗi, con chưa nghe rõ.",
            correct: true
          },
          { text: "Gì?", correct: false },
          { text: "Nói lại.", correct: false }
        ],
        explanation: "You signal that the problem was hearing, not the other person's speech, and you keep the tone respectful."
      }
    ],
    scenario: {
      speaker: "Mother",
      north: "Mai nhớ dậy sớm nhé.",
      south: "Mai nhớ dậy sớm nha.",
      english: "Remember to wake up early tomorrow, okay?",
      answers: [
        {
          north: "Vâng ạ, con nhớ rồi.",
          south: "Dạ, con nhớ rồi.",
          correct: true
        },
        { text: "Biết rồi.", correct: false },
        { text: "Ừ.", correct: false }
      ],
      success: "You acknowledged the reminder naturally. The content is simple, but the small politeness marker changes how the response feels."
    }
  };

  const lessons = window.COURSE_LESSONS || [];
  const index = lessons.findIndex(item => item.id === 2);
  if (index >= 0) lessons[index] = lesson;
  else lessons.push(lesson);
})();