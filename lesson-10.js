(() => {
  const lesson = {
    id: 10,
    status: "ready",
    type: "capstone",
    title: "Surviving a Family Gathering",
    shortTitle: "Family gathering",
    eyebrow: "One gathering. Everything at once.",
    hero: "Use the Vietnamese you already know while the whole family talks, eats, asks questions and keeps moving.",
    intro: "This is the capstone. There is no new vocabulary list. Move through one family gathering from arrival to goodbye and choose the response that fits the relationship, the moment and your selected regional track.",
    outcome: "Handle a full family gathering using relational pronouns, polite responses, meal language, personal-question deflection, small talk, contextual listening, a family toast and a polite exit.",
    audioReady: false,
    skills: [
      "Greet the family",
      "Respond warmly",
      "Handle food",
      "Deflect a personal question",
      "Take teasing lightly",
      "Follow overlapping talk",
      "Join a toast",
      "Leave politely"
    ],
    quizzes: [
      {
        id: "q1",
        scene: 1,
        title: "You arrive",
        speaker: "Mother",
        north: "Hai đứa mới tới à? Vào đây con.",
        south: "Hai đứa mới tới hả? Vô đây con.",
        english: "You two just arrived? Come in.",
        question: "You have just entered the house. What do you say?",
        answers: [
          {
            north: "Vâng ạ, bọn con mới tới. Con chào bố mẹ ạ.",
            south: "Dạ, tụi con mới tới. Con chào ba mẹ.",
            correct: true
          },
          { text: "Tôi mới tới.", correct: false },
          { text: "Chào.", correct: false }
        ],
        explanation: "You acknowledge the mother, answer as a couple, and immediately use the family relationship instead of textbook tôi."
      },
      {
        id: "q2",
        scene: 2,
        title: "The food keeps coming",
        speaker: "Mother",
        north: "Ăn thêm đi con!",
        south: "Ăn thêm đi con!",
        english: "Have some more!",
        question: "You are genuinely full. What is the best response?",
        answers: [
          {
            north: "Thôi ạ, con no rồi. Con cảm ơn mẹ.",
            south: "Dạ thôi, con no rồi. Con cảm ơn mẹ.",
            correct: true
          },
          { text: "Không.", correct: false },
          { text: "Con không thích.", correct: false }
        ],
        explanation: "You decline the food without rejecting the care behind the offer."
      },
      {
        id: "q3",
        scene: 3,
        title: "The auntie question arrives",
        speaker: "Aunt",
        north: "Bao giờ hai đứa cưới?",
        south: "Khi nào hai đứa cưới?",
        english: "When are you two getting married?",
        question: "You do not want to give a date. What do you say?",
        answers: [
          {
            north: "Vâng ạ, chuyện đó bọn con vẫn đang tính.",
            south: "Dạ, chuyện đó tụi con vẫn đang tính.",
            correct: true
          },
          { text: "Không nói.", correct: false },
          { text: "Ngày mai.", correct: false }
        ],
        explanation: "You answer the social moment without promising information you do not want to give."
      },
      {
        id: "q4",
        scene: 4,
        title: "Someone teases you",
        speaker: "Uncle",
        north: "Nói tiếng Việt khá thế, sắp thành người Việt rồi đấy!",
        south: "Nói tiếng Việt khá quá, sắp thành người Việt rồi đó!",
        english: "Your Vietnamese is pretty good. You're almost Vietnamese already!",
        question: "He is teasing you warmly. Which response keeps the tone light?",
        answers: [
          {
            north: "Chưa đâu ạ, con còn phải học nhiều.",
            south: "Dạ chưa đâu, con còn phải học nhiều.",
            correct: true
          },
          { text: "Không đúng.", correct: false },
          { text: "Con là người Việt.", correct: false }
        ],
        explanation: "You accept the friendly intent without taking the joke literally or becoming overly formal."
      },
      {
        id: "q5",
        scene: 5,
        title: "Three conversations overlap",
        speaker: "Several relatives",
        crowd: [
          { speaker: "Mother", north: "Ăn thêm không?", south: "Ăn thêm không?", english: "Want some more?" },
          { speaker: "Aunt", north: "Dạo này công việc có bận không?", south: "Dạo này công việc có bận không?", english: "Has work been busy lately?" },
          { speaker: "Father", north: "Mai hai đứa định đi đâu?", south: "Mai hai đứa định đi đâu?", english: "Where are you two planning to go tomorrow?" }
        ],
        question: "Dad turns toward you last. Which reply answers him?",
        answers: [
          {
            north: "Vâng ạ, mai bọn con định đi chơi một chút.",
            south: "Dạ, mai tụi con định đi chơi một chút.",
            correct: true
          },
          { north: "Con no rồi ạ.", south: "Dạ, con no rồi.", correct: false },
          { north: "Công việc của con vẫn ổn ạ.", south: "Dạ, công việc của con vẫn ổn.", correct: false }
        ],
        explanation: "You do not need to answer every voice. Use who is looking at you plus the strongest words in the last question: mai + đi đâu."
      },
      {
        id: "q6",
        scene: 6,
        title: "The family raises a glass",
        speaker: "Uncle",
        north: "Nào, chúc sức khỏe cả nhà!",
        south: "Nào, chúc sức khỏe cả nhà!",
        english: "Come on, good health to the whole family!",
        question: "What is a simple response that lets you join the toast?",
        answers: [
          {
            north: "Chúc sức khỏe cả nhà ạ!",
            south: "Dạ, chúc sức khỏe cả nhà!",
            correct: true
          },
          { text: "Con no rồi.", correct: false },
          { text: "Mấy giờ về?", correct: false }
        ],
        explanation: "You join the shared wish instead of trying to create a complicated speech."
      }
    ],
    scenario: {
      scene: 7,
      title: "Time to leave",
      speaker: "Mother",
      north: "Về luôn à? Ở lại thêm một chút đi con.",
      south: "Về luôn hả? Ở lại thêm chút đi con.",
      english: "Leaving already? Stay a little longer.",
      answers: [
        {
          north: "Vâng ạ, hôm nay bọn con xin phép về. Con cảm ơn bố mẹ ạ.",
          south: "Dạ, hôm nay tụi con xin phép về. Con cảm ơn ba mẹ.",
          correct: true
        },
        { text: "Bọn con về.", correct: false },
        { text: "Không ở nữa.", correct: false }
      ],
      success: "You closed the gathering warmly: you acknowledged the invitation to stay, used xin phép, thanked the parents, and left without sounding abrupt."
    }
  };

  const lessons = window.COURSE_LESSONS || [];
  const index = lessons.findIndex(item => item.id === 10);
  if (index >= 0) lessons[index] = lesson;
  else lessons.push(lesson);
})();
