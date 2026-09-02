# Vietnamese for Family

**An interactive Vietnamese course for people who want to communicate with their Vietnamese partner, in-laws, and extended family.**

> Speak one dialect. Understand both.

## Why this project exists

Most beginner Vietnamese courses are designed around general vocabulary, travel situations, or formal language study.

But someone dating, engaged to, or married to a Vietnamese person often has a much more specific goal:

**“I want to understand my partner’s family and be able to speak to them without asking my partner to translate everything.”**

Vietnamese for Family is being designed around that problem.

Instead of starting with abstract grammar chapters, the course focuses on real family situations such as:

- meeting parents and grandparents
- using Vietnamese family pronouns correctly
- eating with the family
- helping around the house
- answering questions from relatives
- making everyday small talk
- visiting extended family
- understanding Vietnamese politeness
- participating in Tết
- following conversations between several relatives

## Project status

**Early development / MVP planning.**

The repository currently contains the project definition. The first playable version will focus on one polished introductory lesson before the full curriculum is expanded.

### Initial MVP target

**Lesson 1: Meeting the Family**

Planned MVP capabilities:

- mobile-friendly web interface
- Northern and Southern Vietnamese modes
- a primary-dialect selection during onboarding
- recognition of vocabulary from the other dialect
- clickable pronunciation audio
- vocabulary cards
- listening exercises
- multiple-choice comprehension exercises
- short family conversation scenarios
- local progress storage without requiring an account

## Northern and Southern Vietnamese

The course is designed with two first-class dialect tracks:

- **Northern Vietnamese**, primarily Hanoi-oriented
- **Southern Vietnamese**, primarily Saigon / Ho Chi Minh City-oriented

Learners choose one dialect to actively speak, while gradually learning to recognise the other.

For example:

| English | Northern | Southern |
| --- | --- | --- |
| Dad | bố | ba |
| Bowl | bát | chén |
| Spoon | thìa | muỗng |
| Glass | cốc | ly |
| Pig | lợn | heo |

The objective is not to force beginners to speak two dialects at once.

The learning principle is:

> **Speak one. Understand both.**

## Family-first Vietnamese

Vietnamese family language cannot be taught effectively as a simple English-style “I / you” system.

How a learner refers to themselves and another person depends on age, generation, relationship, and family context.

A future core feature is therefore a **Family Map**.

The learner will be able to define important relatives and see the appropriate terms of address for each relationship.

Example:

```text
Partner's mother

You call her: mẹ / má
You refer to yourself as: con

Con chào mẹ ạ.
Con cảm ơn mẹ.
Để con giúp.
```

This relationship system is intended to become part of lessons and conversation simulations rather than existing only as a vocabulary reference.

## Audio and pronunciation

Pronunciation is central to the project because Vietnamese is tonal and regional pronunciation differs substantially.

The planned interface allows a learner to tap a word, expression, or sentence to hear it pronounced.

Example:

```text
Con ăn cơm chưa?

🔊 North
🔊 South
```

The project is designed to support stored audio files such as:

```text
audio/
├── north/
│   ├── greetings/
│   └── lesson-01/
└── south/
    ├── greetings/
    └── lesson-01/
```

During development, reviewed text-to-speech audio may be used for rapid prototyping. Important course material can later be replaced with recordings from native Northern and Southern Vietnamese speakers.

Pre-generated audio is preferred over exposing paid text-to-speech API credentials in a public browser application.

## Planned learning structure

The full course is currently envisioned as a 12-week family-focused program.

### Phase 1: Meeting the family

1. Meeting parents and grandparents
2. Food and family meals

### Phase 2: Family questions

3. Personal questions and the “relative interrogation”
4. Work, relationships, plans, and polite answers

### Phase 3: Everyday family life

5. Helping around the house
6. Family small talk

### Phase 4: Listening and social Vietnamese

7. Understanding natural family speech
8. Politeness particles and socially natural responses

### Phase 5: Culture and extended family

9. Tết and family gatherings
10. Humour, affection, teasing, and indirect meaning

### Phase 6: Real conversation

11. Following conversations with multiple speakers
12. Weekend-with-the-in-laws simulation

The exact curriculum will evolve through testing with Vietnamese speakers and learners.

## Example lesson interaction

A lesson should teach language inside a situation rather than presenting isolated grammar first.

Example:

```text
Your partner's mother opens the door.

🔊 Hai đứa mới tới hả?

What does she mean?

A. Are you hungry?
B. Did you just arrive? ✓
C. Where are you going?
```

A speaking exercise might then introduce:

```text
Con chào mẹ ạ.

🔊 Hear it
🐢 Hear it slowly
🎤 Your turn
```

Grammar explanations should be available when useful, but conversation and comprehension remain the primary learning flow.

## Planned project structure

```text
vietnamese-for-family/
├── index.html
├── style.css
├── app.js
├── README.md
├── data/
│   ├── lessons.json
│   ├── vocabulary.json
│   └── family-relationships.json
├── audio/
│   ├── north/
│   └── south/
└── images/
```

The first release is intended to remain a lightweight static web application that can run on GitHub Pages without requiring a backend.

## GitHub Pages

The MVP is intended to be publishable through **GitHub Pages**.

Once the first website files are ready, the project can be deployed from the repository's `main` branch through:

**Repository → Settings → Pages**

The expected public URL format is:

```text
https://annnmm219.github.io/vietnamese-for-family/
```

## Design principles

1. **Family situations before generic tourist vocabulary.**
2. **Speaking and listening before formal grammar study.**
3. **One active dialect, two-dialect recognition.**
4. **Natural Vietnamese instead of mechanically translated English.**
5. **Relationship terms taught through actual family relationships.**
6. **Cultural meaning taught alongside literal meaning.**
7. **Short, interactive sessions rather than long textbook lessons.**
8. **No API secrets exposed in the public frontend.**

## Long-term ideas

Potential later features include:

- personalised Family Map
- custom vocabulary based on the learner's real family
- partner mode for correcting preferred family terms
- family-member voice recordings
- pronunciation feedback
- spaced-repetition review
- adaptive difficulty
- AI conversation practice
- multi-speaker family simulations
- synced progress across devices
- additional regional Vietnamese listening exposure

These are future ideas, not current features.

## Contributing

The project is currently in early development. Feedback from Vietnamese speakers, Vietnamese learners, mixed-language couples, and people navigating Vietnamese family relationships will be especially valuable as the course develops.

## License

No open-source license has been selected yet.

Unless a license is added later, the repository should not be assumed to grant permission to copy, modify, or redistribute its contents.
