(() => {
  const lesson = {
    id: 9,
    status: "ready",
    type: "visit",
    title: "Tết & Family Visits",
    shortTitle: "Tết & visits",
    eyebrow: "Know what to say and what to do",
    hero: "Walk into a Tết visit knowing the sequence, the language, and when to follow the family's lead.",
    intro: "Tết visits can feel more formal than an ordinary family afternoon, but you do not need to memorise a ceremony. Learn a safe sequence: greet the elders, offer a simple New Year wish, follow the household's practice around the altar, receive lì xì warmly, and leave politely.",
    outcome: "Handle a Tết family visit with respectful greetings, simple wishes, safe altar etiquette, a natural response to lì xì, and a polite goodbye.",
    audioReady: false,
    visitSteps: [
      {
        number: 1,
        title: "Arrive and greet the elders",
        north: "Con chào bố mẹ ạ. Cháu chào ông bà ạ.",
        south: "Dạ, con chào ba mẹ. Dạ, cháu chào ông bà.",
        english: "Hello Mom and Dad. Hello Grandma and Grandpa.",
        note: "Use the same relationship terms you learned in Lesson 1. Tết does not replace the family hierarchy; it makes those greetings more visible."
      },
      {
        number: 2,
        title: "Give one simple Tết wish",
        north: "Cháu chúc ông bà năm mới mạnh khỏe, vui vẻ ạ.",
        south: "Dạ, cháu chúc ông bà năm mới mạnh khỏe, vui vẻ.",
        english: "I wish Grandma and Grandpa good health and happiness in the new year.",
        note: "You do not need a long poetic greeting. Health and happiness are safe, warm wishes for older relatives."
      },
      {
        number: 3,
        title: "At the family altar, follow the household",
        north: "Con làm thế nào ạ?",
        south: "Dạ, con làm thế nào?",
        english: "How should I do this?",
        note: "Families differ. Some may invite you to light incense or bow; others may have their own roles and sequence. Follow your partner or an older family member, and ask before touching or rearranging altar objects, incense, or offerings."
      },
      {
        number: 4,
        title: "Receive lì xì as a gesture",
        north: "Cháu cảm ơn ông bà ạ.",
        south: "Dạ, cháu cảm ơn ông bà.",
        english: "Thank you, Grandma and Grandpa.",
        note: "Respond to the giver, not the amount. Whether people open the envelope immediately varies by family, so follow the room rather than treating one rule as universal."
      },
      {
        number: 5,
        title: "Leave politely",
        north: "Con xin phép bố mẹ, bọn con về ạ.",
        south: "Dạ, con xin phép ba mẹ, tụi con về.",
        english: "Mom and Dad, please excuse us; we're heading home.",
        note: "Xin phép makes the departure feel relational rather than abrupt. Say goodbye to the people you greeted rather than simply disappearing after the meal."
      }
    ],
    keyTerms: [
      { north: "chúc Tết", south: "chúc Tết", meaning: "give New Year wishes" },
      { north: "sức khỏe", south: "sức khỏe", meaning: "health" },
      { north: "lì xì", south: "lì xì", meaning: "lucky money / red envelope" },
      { north: "bàn thờ", south: "bàn thờ", meaning: "family altar" },
      { north: "thắp hương", south: "thắp hương", meaning: "light incense" },
      { north: "xin phép", south: "xin phép", meaning: "politely excuse oneself / ask permission" }
    ],
    quizzes: [
      {
        id: "q1",
        question: "You arrive at a Tết visit and grandparents are already in the room. What is the best first move?",
        answers: [
          {
            north: "Cháu chào ông bà ạ.",
            south: "Dạ, cháu chào ông bà.",
            correct: true
          },
          { text: "Walk straight to the food table first", correct: false },
          { text: "Wait silently for your partner to greet everyone for you", correct: false }
        ],
        explanation: "Start with the relationship. A simple greeting to the elders is more important than producing an elaborate Tết speech immediately."
      },
      {
        id: "q2",
        question: "Grandma gives you a lì xì envelope. Which response keeps the moment warm?",
        answers: [
          {
            north: "Cháu cảm ơn bà ạ.",
            south: "Dạ, cháu cảm ơn bà.",
            correct: true
          },
          { text: "Bao nhiêu tiền?", correct: false },
          { text: "Con không cần.", correct: false }
        ],
        explanation: "Thank the giver and treat lì xì as a relational gesture. The amount is not the point of the exchange."
      },
      {
        id: "q3",
        question: "The family starts a ritual at the altar and you are not sure what they expect from you. What is the safest approach?",
        answers: [
          { text: "Follow the family's lead and ask before handling anything", correct: true },
          { text: "Rearrange the offerings so you can participate", correct: false },
          { text: "Assume every Vietnamese family follows the same ritual", correct: false }
        ],
        explanation: "Household practice varies. Respect comes from following the family in front of you, not from forcing a memorised universal rule."
      }
    ],
    scenario: {
      speaker: "Mother",
      north: "Hai đứa mới tới à? Vào chúc Tết ông bà đi con.",
      south: "Hai đứa mới tới hả? Vô chúc Tết ông bà đi con.",
      english: "You two just arrived? Go in and give New Year wishes to Grandma and Grandpa.",
      answers: [
        {
          north: "Vâng ạ. Cháu chúc ông bà năm mới mạnh khỏe, vui vẻ ạ.",
          south: "Dạ. Cháu chúc ông bà năm mới mạnh khỏe, vui vẻ.",
          correct: true
        },
        { text: "Lì xì đâu?", correct: false },
        { text: "Con ngồi đây.", correct: false }
      ],
      success: "You understood what your mother-in-law wanted, moved toward the elders, and used a simple Tết wish that fits the relationship."
    }
  };

  const lessons = window.COURSE_LESSONS || [];
  const index = lessons.findIndex(item => item.id === 9);
  if (index >= 0) lessons[index] = lesson;
  else lessons.push(lesson);
})();
