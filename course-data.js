window.COURSE_LESSONS = [
  {
    id: 1,
    title: "Meeting the Family",
    shortTitle: "Meet the family",
    eyebrow: "Your first family visit",
    hero: "Walk in, greet everyone correctly, and know what to say back.",
    intro: "Start with relationship language, not textbook ‘I’ and ‘you’. Choose the Vietnamese you want to speak and learn to recognise the other variety.",
    outcome: "Greet parents and grandparents, use con naturally with parents, and handle the first exchange at the door.",
    audioReady: true,
    vocabulary: [
      { id: "mom", meaning: "Mom / mother", north: "mẹ", south: "mẹ", noteNorth: "Mẹ is standard and widely used in the North.", noteSouth: "Mẹ is widely understood. Má is also common in many Southern families, so use the term your family prefers." },
      { id: "dad", meaning: "Dad / father", north: "bố", south: "ba", noteNorth: "Bố is a common Northern family term for dad.", noteSouth: "Ba is a common Southern family term for dad." },
      { id: "self-child", meaning: "You, when speaking to parents", north: "con", south: "con", noteNorth: "With parents or parents-in-law, you commonly refer to yourself as con rather than tôi.", noteSouth: "With parents or parents-in-law, you commonly refer to yourself as con rather than tôi." },
      { id: "grandfather", meaning: "Grandfather", north: "ông", south: "ông", noteNorth: "For your partner's grandfather, you normally call him ông and yourself cháu.", noteSouth: "For your partner's grandfather, you normally call him ông and yourself cháu." },
      { id: "grandmother", meaning: "Grandmother", north: "bà", south: "bà", noteNorth: "For your partner's grandmother, you normally call her bà and yourself cháu.", noteSouth: "For your partner's grandmother, you normally call her bà and yourself cháu." },
      { id: "polite-yes", meaning: "Polite acknowledgement", north: "vâng ạ", south: "dạ", noteNorth: "Vâng and ạ are common polite markers. Dạ is also understood and used.", noteSouth: "Dạ is extremely useful for politely acknowledging an older person." }
    ],
    phrases: [
      { id: "hello-mom", english: "Hello, Mom.", north: "Con chào mẹ ạ.", south: "Dạ, con chào mẹ." },
      { id: "hello-dad", english: "Hello, Dad.", north: "Con chào bố ạ.", south: "Dạ, con chào ba." },
      { id: "hello-grandparents", english: "Hello, Grandma and Grandpa.", north: "Cháu chào ông bà ạ.", south: "Dạ, cháu chào ông bà." },
      { id: "nice-to-meet", english: "I'm very happy to meet you both.", north: "Con rất vui được gặp bố mẹ ạ.", south: "Dạ, con rất vui được gặp ba mẹ." }
    ],
    pattern: { label: "Introduce yourself", north: "Con tên là [tên của bạn].", south: "Dạ, con tên là [tên của bạn].", english: "My name is [your name]." },
    comparison: [
      { meaning: "Dad", north: "bố", south: "ba" },
      { meaning: "Polite acknowledgement", north: "vâng ạ", south: "dạ" }
    ],
    quizzes: [
      { id: "q1", question: "You meet your partner's mother. Which greeting fits your selected track?", answers: [
        { north: "Con chào mẹ ạ.", south: "Dạ, con chào mẹ.", correct: true },
        { text: "Tôi chào bạn.", correct: false },
        { text: "Xin chào mẹ của bạn.", correct: false }
      ], explanation: "Correct. The response uses the parent-child family relationship and an appropriate politeness pattern." },
      { id: "q2", question: "When speaking directly to your partner's parents, what do you commonly call yourself?", answers: [
        { text: "con", correct: true }, { text: "tôi", correct: false }, { text: "bạn", correct: false }
      ], explanation: "Correct. In this relationship, con is the natural family pronoun to learn first." },
      { id: "q3", question: "Which word are we teaching you to actively use for ‘Dad’ in your selected track?", answers: [
        { north: "bố", south: "ba", correct: true },
        { north: "ba", south: "bố", correct: false },
        { text: "ông", correct: false }
      ], explanation: "Correct. Speak the form used in your track while learning to recognise the other regional form." }
    ],
    scenario: {
      speaker: "Mother",
      north: "Hai đứa mới tới à?",
      south: "Hai đứa mới tới hả?",
      english: "You two just arrived?",
      answers: [
        { north: "Vâng ạ, bọn con mới tới.", south: "Dạ, tụi con mới tới.", correct: true },
        { text: "Tôi tới.", correct: false },
        { text: "Không biết.", correct: false }
      ],
      success: "Good. You acknowledged her politely and answered as a couple rather than defaulting to formal textbook tôi."
    },
    finalNorth: "Con chào bố mẹ ạ.",
    finalSouth: "Dạ, con chào ba mẹ."
  },
  {
    id: 2,
    title: "Food and Family Meals",
    shortTitle: "Food & meals",
    eyebrow: "The Vietnamese love language",
    hero: "Know when you are being fed, praised, or offered a third bowl of rice.",
    intro: "Family meals are one of the fastest ways to feel included. Learn the phrases that let you accept food, compliment it, and decline more without sounding abrupt.",
    outcome: "Understand common meal questions, participate politely, and survive ‘ăn thêm đi con’ without panic.",
    audioReady: false,
    vocabulary: [
      { id: "meal", meaning: "Rice / cooked meal", north: "cơm", south: "cơm", noteNorth: "Ăn cơm can mean eat rice or simply have a meal.", noteSouth: "Ăn cơm can mean eat rice or simply have a meal." },
      { id: "hungry", meaning: "Hungry", north: "đói", south: "đói", noteNorth: "Có đói không? is a very common family question.", noteSouth: "Có đói không? is a very common family question." },
      { id: "full", meaning: "Full", north: "no", south: "no", noteNorth: "Con no rồi ạ is a polite way to say you are full.", noteSouth: "Dạ, con no rồi is a natural Southern response." },
      { id: "bowl", meaning: "Bowl", north: "bát", south: "chén", noteNorth: "Bát is the common Northern word used in this course.", noteSouth: "Chén is the common Southern word used in this course." },
      { id: "spoon", meaning: "Spoon", north: "thìa", south: "muỗng", noteNorth: "Thìa is common in the North.", noteSouth: "Muỗng is common in the South." },
      { id: "delicious", meaning: "Delicious / tasty", north: "ngon", south: "ngon", noteNorth: "Ngon lắm ạ is a useful, safe compliment at the table.", noteSouth: "Dạ, ngon lắm is a useful, safe compliment at the table." }
    ],
    phrases: [
      { id: "invite-meal", english: "Please eat, Mom and Dad. / I invite you to eat.", north: "Con mời bố mẹ ăn cơm ạ.", south: "Con mời ba mẹ ăn cơm." },
      { id: "very-good", english: "It's very delicious.", north: "Ngon lắm ạ.", south: "Dạ, ngon lắm." },
      { id: "full-now", english: "I'm full now.", north: "Con no rồi ạ.", south: "Dạ, con no rồi." },
      { id: "little-more", english: "I'll have a little more.", north: "Con ăn thêm một chút ạ.", south: "Dạ, con ăn thêm một chút." },
      { id: "polite-decline", english: "No more, thank you, Mom.", north: "Thôi ạ, con cảm ơn mẹ.", south: "Dạ thôi, con cảm ơn mẹ." }
    ],
    pattern: { label: "Answer the classic question", north: "Con ăn rồi ạ. / Con chưa ăn ạ.", south: "Dạ, con ăn rồi. / Dạ, con chưa ăn.", english: "I've eaten already. / I haven't eaten yet." },
    comparison: [
      { meaning: "Bowl", north: "bát", south: "chén" },
      { meaning: "Spoon", north: "thìa", south: "muỗng" }
    ],
    quizzes: [
      { id: "q1", question: "Your partner's mother asks ‘Ăn cơm chưa?’. What is she asking?", answers: [
        { text: "Have you eaten yet?", correct: true }, { text: "Do you want coffee?", correct: false }, { text: "Are you going home?", correct: false }
      ], explanation: "Correct. Literally it mentions rice, but in family conversation it commonly means ‘Have you eaten yet?’" },
      { id: "q2", question: "You are full but want to stay polite. Which response fits your track?", answers: [
        { north: "Con no rồi ạ.", south: "Dạ, con no rồi.", correct: true },
        { text: "Không.", correct: false },
        { text: "Đủ rồi.", correct: false }
      ], explanation: "Correct. It answers clearly without making the refusal sound abrupt." },
      { id: "q3", question: "Which word means ‘bowl’ in your active track?", answers: [
        { north: "bát", south: "chén", correct: true },
        { north: "chén", south: "bát", correct: false },
        { text: "muỗng", correct: false }
      ], explanation: "Correct. This is one of the everyday North/South differences worth recognising immediately." }
    ],
    scenario: {
      speaker: "Mother",
      north: "Ăn thêm đi con!",
      south: "Ăn thêm đi con!",
      english: "Have some more!",
      answers: [
        { north: "Thôi ạ, con no rồi. Con cảm ơn mẹ.", south: "Dạ thôi, con no rồi. Con cảm ơn mẹ.", correct: true },
        { text: "Không.", correct: false },
        { text: "Con không thích.", correct: false }
      ],
      success: "Good. You declined the extra food while still acknowledging the care behind the offer."
    }
  },
  {
    id: 3,
    title: "Questions from Relatives",
    shortTitle: "Family questions",
    eyebrow: "The auntie gauntlet",
    hero: "Answer the questions everyone warned you would be asked.",
    intro: "Age, work, where you live, how long you have been together, marriage and children can all enter family conversation quickly. The goal is not to disclose everything. It is to understand the question and respond without freezing.",
    outcome: "Recognise common personal questions, give simple answers, and deflect politely when you do not want to commit to an answer.",
    audioReady: false,
    vocabulary: [
      { id: "age-question", meaning: "How old?", north: "bao nhiêu tuổi", south: "bao nhiêu tuổi", noteNorth: "A common direct question in Vietnamese social conversation.", noteSouth: "A common direct question in Vietnamese social conversation." },
      { id: "job-question", meaning: "What job / profession?", north: "làm nghề gì", south: "làm nghề gì", noteNorth: "Used to ask what someone does for work.", noteSouth: "Used to ask what someone does for work." },
      { id: "where", meaning: "Where?", north: "ở đâu", south: "ở đâu", noteNorth: "Useful in questions about home, work and travel.", noteSouth: "Useful in questions about home, work and travel." },
      { id: "how-long", meaning: "How long?", north: "bao lâu", south: "bao lâu", noteNorth: "Useful for relationships, work and travel duration.", noteSouth: "Useful for relationships, work and travel duration." },
      { id: "when", meaning: "When?", north: "bao giờ", south: "khi nào", noteNorth: "Bao giờ is a very common Northern choice for ‘when’.", noteSouth: "Khi nào is a common Southern choice in this course. Both forms are widely understood." },
      { id: "marry", meaning: "To marry / get married", north: "cưới", south: "cưới", noteNorth: "Expect this word to appear in family questions.", noteSouth: "Expect this word to appear in family questions." }
    ],
    phrases: [
      { id: "understand-age", english: "I'm ... years old.", north: "Con ... tuổi ạ.", south: "Dạ, con ... tuổi." },
      { id: "understand-work", english: "I work as ...", north: "Con làm ... ạ.", south: "Dạ, con làm ..." },
      { id: "relationship-years", english: "We've been together for ... years.", north: "Bọn con quen nhau được ... năm rồi ạ.", south: "Dạ, tụi con quen nhau được ... năm rồi." },
      { id: "not-yet", english: "We haven't decided yet.", north: "Bọn con chưa quyết định ạ.", south: "Dạ, tụi con chưa quyết định." },
      { id: "maybe-later", english: "Probably a little later.", north: "Chắc còn một thời gian nữa ạ.", south: "Dạ, chắc còn một thời gian nữa." }
    ],
    pattern: { label: "Use a graceful non-answer", north: "Vâng ạ, chuyện đó bọn con vẫn đang tính.", south: "Dạ, chuyện đó tụi con vẫn đang tính.", english: "We're still thinking about that." },
    comparison: [
      { meaning: "When?", north: "bao giờ", south: "khi nào" },
      { meaning: "We / us (informal group)", north: "bọn con", south: "tụi con" }
    ],
    quizzes: [
      { id: "q1", question: "A relative asks ‘Hai đứa quen nhau bao lâu rồi?’. What do they want to know?", answers: [
        { text: "How long have you two been together?", correct: true }, { text: "Where are you going?", correct: false }, { text: "How old are you?", correct: false }
      ], explanation: "Correct. Bao lâu asks about duration." },
      { id: "q2", question: "You do not want to give a firm marriage date. Which answer keeps the conversation polite without making a promise?", answers: [
        { north: "Chắc còn một thời gian nữa ạ.", south: "Dạ, chắc còn một thời gian nữa.", correct: true },
        { text: "Không biết.", correct: false },
        { text: "Không cưới.", correct: false }
      ], explanation: "Correct. It gives the conversation somewhere to go without committing to a date." },
      { id: "q3", question: "Which form are we using for ‘we/us’ in your active track?", answers: [
        { north: "bọn con", south: "tụi con", correct: true },
        { north: "tụi con", south: "bọn con", correct: false },
        { text: "chúng tôi", correct: false }
      ], explanation: "Correct. This is family-context speech, not a formal presentation." }
    ],
    scenario: {
      speaker: "Aunt",
      north: "Bao giờ hai đứa cưới?",
      south: "Khi nào hai đứa cưới?",
      english: "When are you two getting married?",
      answers: [
        { north: "Vâng ạ, chuyện đó bọn con vẫn đang tính.", south: "Dạ, chuyện đó tụi con vẫn đang tính.", correct: true },
        { text: "Không biết.", correct: false },
        { text: "Đừng hỏi.", correct: false }
      ],
      success: "Good. You understood the question and kept control of how much you wanted to disclose."
    }
  },
  {
    id: 4,
    title: "Work, Home and Plans",
    shortTitle: "Work & plans",
    eyebrow: "Small talk that actually matters",
    hero: "Talk about your life without needing your partner to answer for you.",
    intro: "Once the introductions are over, relatives need easy topics to keep talking to you. Work, where you live, what you like and tomorrow's plans create useful conversational bridges.",
    outcome: "Describe work and everyday life in simple Vietnamese, understand basic follow-up questions, and answer plans as a couple.",
    audioReady: false,
    vocabulary: [
      { id: "work", meaning: "Work / job", north: "công việc", south: "công việc", noteNorth: "Dạo này công việc thế nào? means ‘How is work lately?’", noteSouth: "Dạo này công việc thế nào? means ‘How is work lately?’" },
      { id: "company", meaning: "Company", north: "công ty", south: "công ty", noteNorth: "Useful when explaining where you work.", noteSouth: "Useful when explaining where you work." },
      { id: "live", meaning: "To live", north: "sống", south: "sống", noteNorth: "Con sống ở... gives a simple location answer.", noteSouth: "Con sống ở... gives a simple location answer." },
      { id: "like", meaning: "To like", north: "thích", south: "thích", noteNorth: "A high-value verb for food, places and activities.", noteSouth: "A high-value verb for food, places and activities." },
      { id: "plan", meaning: "To plan / intend", north: "định", south: "định", noteNorth: "Mai bọn con định... is a natural way to describe tomorrow's plan.", noteSouth: "Mai tụi con định... is a natural way to describe tomorrow's plan." },
      { id: "lately", meaning: "Lately / these days", north: "dạo này", south: "dạo này", noteNorth: "Common in friendly check-ins about work and health.", noteSouth: "Common in friendly check-ins about work and health." }
    ],
    phrases: [
      { id: "work-fine", english: "Work is still going well.", north: "Công việc của con vẫn ổn ạ.", south: "Dạ, công việc của con vẫn ổn." },
      { id: "work-company", english: "I work for a company in ...", north: "Con làm cho một công ty ở ... ạ.", south: "Dạ, con làm cho một công ty ở ..." },
      { id: "live-in", english: "I live in ...", north: "Con sống ở ... ạ.", south: "Dạ, con sống ở ..." },
      { id: "like-vietnam", english: "I really like Vietnam.", north: "Con rất thích Việt Nam ạ.", south: "Dạ, con rất thích Việt Nam." },
      { id: "tomorrow-plan", english: "Tomorrow we're planning to go out for a bit.", north: "Mai bọn con định đi chơi một chút ạ.", south: "Dạ, mai tụi con định đi chơi một chút." }
    ],
    pattern: { label: "Build a simple answer", north: "Con + [động từ] + [thông tin] + ạ.", south: "Dạ, con + [động từ] + [thông tin].", english: "I + [verb] + [information]." },
    comparison: [
      { meaning: "We / us", north: "bọn con", south: "tụi con" },
      { meaning: "Polite opening", north: "vâng ạ", south: "dạ" }
    ],
    quizzes: [
      { id: "q1", question: "Someone asks ‘Dạo này công việc thế nào?’. What topic are they asking about?", answers: [
        { text: "How work has been lately", correct: true }, { text: "When you are getting married", correct: false }, { text: "What you want to eat", correct: false }
      ], explanation: "Correct. Dạo này means lately / these days, and công việc means work." },
      { id: "q2", question: "Which sentence gives a simple positive answer about work?", answers: [
        { north: "Công việc của con vẫn ổn ạ.", south: "Dạ, công việc của con vẫn ổn.", correct: true },
        { text: "Con no rồi.", correct: false },
        { text: "Con chưa ăn.", correct: false }
      ], explanation: "Correct. Vẫn ổn means things are still going fine." },
      { id: "q3", question: "Your partner's father asks about tomorrow. Which form answers as a couple in your track?", answers: [
        { north: "Mai bọn con định...", south: "Mai tụi con định...", correct: true },
        { text: "Mai tôi định...", correct: false },
        { text: "Ngày mai bạn...", correct: false }
      ], explanation: "Correct. The family-context plural keeps your answer connected to your partner." }
    ],
    scenario: {
      speaker: "Dad",
      north: "Mai hai đứa định đi đâu?",
      south: "Mai hai đứa định đi đâu?",
      english: "Where are you two planning to go tomorrow?",
      answers: [
        { north: "Vâng ạ, mai bọn con định đi chơi một chút.", south: "Dạ, mai tụi con định đi chơi một chút.", correct: true },
        { text: "Tôi đi.", correct: false },
        { text: "Không ăn.", correct: false }
      ],
      success: "Good. You caught the time word, the couple reference and the plan question without needing a word-for-word translation."
    }
  },
  {
    id: 5,
    title: "Helping Around the House",
    shortTitle: "Help at home",
    eyebrow: "Stop being only the guest",
    hero: "Offer help naturally and understand the small instructions that make you part of the household.",
    intro: "Helping with dishes, setting the table or fetching something gives you useful repetitive language. This lesson focuses on short actions you will hear and use again and again.",
    outcome: "Offer help, understand simple household requests, and recognise key North/South kitchen vocabulary.",
    audioReady: false,
    vocabulary: [
      { id: "help", meaning: "Help", north: "giúp", south: "phụ", noteNorth: "Giúp is the main form taught in the Northern track.", noteSouth: "Phụ is a natural Southern choice when offering to help with a task. Giúp is also widely used." },
      { id: "wash", meaning: "Wash", north: "rửa", south: "rửa", noteNorth: "Rửa bát means wash the dishes.", noteSouth: "Rửa chén means wash the dishes." },
      { id: "bowl", meaning: "Bowl / dishes", north: "bát", south: "chén", noteNorth: "Bát appears constantly in kitchen talk.", noteSouth: "Chén appears constantly in kitchen talk." },
      { id: "take", meaning: "Take / get", north: "lấy", south: "lấy", noteNorth: "Lấy giúp mẹ... is a common request pattern.", noteSouth: "Lấy giùm mẹ... is a common request pattern." },
      { id: "where-put", meaning: "Where to put it?", north: "để ở đâu", south: "để đâu", noteNorth: "Cái này để ở đâu ạ? is safe and useful.", noteSouth: "Cái này để đâu vậy mẹ? is natural family speech." },
      { id: "table", meaning: "Table", north: "bàn", south: "bàn", noteNorth: "Dọn bàn can mean set or clear the table depending on context.", noteSouth: "Dọn bàn can mean set or clear the table depending on context." }
    ],
    phrases: [
      { id: "let-help", english: "Let me help.", north: "Để con giúp mẹ ạ.", south: "Để con phụ mẹ." },
      { id: "wash-dishes", english: "I'll wash the dishes.", north: "Để con rửa bát ạ.", south: "Để con rửa chén." },
      { id: "clear-table", english: "I'll clear the table.", north: "Để con dọn bàn ạ.", south: "Để con dọn bàn." },
      { id: "where-this", english: "Where does this go?", north: "Cái này để ở đâu ạ?", south: "Cái này để đâu vậy mẹ?" },
      { id: "i-can", english: "I can do it.", north: "Con làm được ạ.", south: "Dạ, con làm được." }
    ],
    pattern: { label: "Understand a household request", north: "Lấy giúp mẹ + [đồ vật] + nhé.", south: "Lấy giùm mẹ + [đồ vật] + nha.", english: "Please get [object] for me." },
    comparison: [
      { meaning: "Dishes / bowls", north: "bát", south: "chén" },
      { meaning: "Help / lend a hand", north: "giúp", south: "phụ" },
      { meaning: "Please do for me", north: "giúp", south: "giùm" }
    ],
    quizzes: [
      { id: "q1", question: "You want to offer help instead of waiting to be asked. Which sentence fits your track?", answers: [
        { north: "Để con giúp mẹ ạ.", south: "Để con phụ mẹ.", correct: true },
        { text: "Con ngồi đây.", correct: false },
        { text: "Mẹ làm đi.", correct: false }
      ], explanation: "Correct. It sounds like an offer, not a command." },
      { id: "q2", question: "Your partner's mother asks for two bát/chén. What should you look for?", answers: [
        { text: "Two bowls", correct: true }, { text: "Two spoons", correct: false }, { text: "Two chairs", correct: false }
      ], explanation: "Correct. The regional word changes, but the object is the same." },
      { id: "q3", question: "You are holding something and do not know where it belongs. What do you ask?", answers: [
        { north: "Cái này để ở đâu ạ?", south: "Cái này để đâu vậy mẹ?", correct: true },
        { text: "Cái này bao nhiêu tuổi?", correct: false },
        { text: "Cái này ăn chưa?", correct: false }
      ], explanation: "Correct. This is one of the highest-value household questions because you can reuse it constantly." }
    ],
    scenario: {
      speaker: "Mother",
      north: "Lấy giúp mẹ hai cái bát nhé.",
      south: "Lấy giùm mẹ hai cái chén nha.",
      english: "Please get me two bowls.",
      answers: [
        { north: "Vâng ạ, để con lấy.", south: "Dạ, để con lấy.", correct: true },
        { text: "Con no rồi.", correct: false },
        { text: "Bao giờ cưới?", correct: false }
      ],
      success: "Good. You recognised the request, the quantity and the object, then acknowledged it naturally."
    }
  }
];
