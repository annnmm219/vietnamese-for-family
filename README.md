# Vietnamese for Family

**An interactive Vietnamese course for people who want to communicate with their Vietnamese partner, in-laws, and extended family.**

> Speak one dialect. Understand both.

## Project status

**V0.1 is now playable.**

The first lesson, **Lesson 1: Meeting the Family**, is implemented as a lightweight static web app. It is designed to run directly on GitHub Pages without a backend or account system.

### What works in V0.1

- Northern and Southern Vietnamese speaking modes
- one active dialect with recognition of the other
- family-first vocabulary
- clickable Vietnamese speech playback
- normal and slow playback
- personalised practice sentence using the learner's name
- North/South vocabulary comparison
- three interactive comprehension questions
- a short front-door family scenario
- lesson progress saved locally in the browser
- responsive layout for desktop and mobile

### Audio in V0.1

V0.1 uses the browser's built-in Vietnamese speech synthesis so the pronunciation buttons work without an API key or backend.

This is intentionally a prototype layer. The wording changes appropriately between the Northern and Southern tracks where relevant, but the actual voice and regional accent depend on the learner's device.

The planned production approach is to replace important speech with reviewed recordings from native Northern and Southern Vietnamese speakers, or reviewed pre-generated audio files stored in the repository.

## Why this project exists

Most beginner Vietnamese courses focus on general vocabulary, travel situations, or formal language study. Someone dating, engaged to, or married to a Vietnamese person often has a much narrower and more immediate problem:

**“I want to understand my partner's family and speak to them without asking my partner to translate everything.”**

Vietnamese for Family starts there.

The course is designed around situations such as:

- meeting parents and grandparents
- using Vietnamese relationship terms correctly
- eating with the family
- helping around the house
- answering questions from relatives
- everyday small talk
- visiting extended family
- Vietnamese politeness
- Tết and family gatherings
- following conversations involving several relatives

## Lesson 1: Meeting the Family

The first lesson teaches the minimum language needed to arrive at a family home and interact respectfully.

It currently covers:

### Family terms

- mẹ
- bố / ba
- con
- ông
- bà
- vâng ạ / dạ

### Core greetings

Examples adapt to the learner's selected dialect, including forms such as:

```text
Con chào mẹ ạ.
Con chào bố ạ.
Con chào ba.
Cháu chào ông bà ạ.
Con rất vui được gặp bố mẹ ạ.
Con rất vui được gặp ba mẹ.
```

Vietnamese family language varies by household, region, age, and relationship status. The course therefore treats regional labels as useful learning defaults rather than absolute rules. A future Family Map and Partner Mode will let learners specify what their actual family uses.

## Northern and Southern Vietnamese

The course has two first-class tracks:

- **Northern Vietnamese**, primarily Hanoi-oriented
- **Southern Vietnamese**, primarily Saigon / Ho Chi Minh City-oriented

The learner chooses one variety to actively speak while learning to recognise common alternatives from the other.

| English | Northern | Southern |
| --- | --- | --- |
| Dad | bố | ba |
| Bowl | bát | chén |
| Spoon | thìa | muỗng |
| Glass | cốc | ly |
| Pig | lợn | heo |

The learning principle is:

> **Speak one. Understand both.**

## Family-first Vietnamese

Vietnamese cannot be taught effectively as a simple English-style “I / you” system. Terms depend on generation, age, relationship, and context.

A future core feature is therefore a **Family Map**.

Example:

```text
Partner's mother

You call her: mẹ / má, depending on the family
You refer to yourself as: con, when that family relationship is appropriate
```

The long-term goal is for lessons to adapt to the learner's real Vietnamese family instead of teaching one generic household.

## Current project structure

```text
vietnamese-for-family/
├── index.html      # website shell
├── styles.css      # responsive visual design
├── app.js          # Lesson 1 content and interactions
└── README.md       # project documentation
```

Planned additions include:

```text
data/
audio/
├── north/
└── south/
images/
```

## Run the project

Because V0.1 is a static web app, it can be hosted directly through GitHub Pages.

For GitHub Pages:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose the `main` branch and `/ (root)` folder.
5. Save.

The expected public URL is:

```text
https://annnmm219.github.io/vietnamese-for-family/
```

## Design principles

1. **Family situations before generic tourist vocabulary.**
2. **Speaking and listening before formal grammar study.**
3. **One active dialect, two-dialect recognition.**
4. **Natural Vietnamese instead of mechanically translated English.**
5. **Relationship language taught through real relationships.**
6. **Cultural meaning taught alongside literal meaning.**
7. **Short interactive sessions rather than textbook chapters.**
8. **No paid API secrets exposed in the public frontend.**

## Planned course

The broader program is envisioned as a 12-week family-focused course:

1. Meeting parents and grandparents
2. Food and family meals
3. Personal questions and the relative interrogation
4. Work, relationships, plans, and polite answers
5. Helping around the house
6. Family small talk
7. Understanding natural family speech
8. Politeness particles and socially natural responses
9. Tết and family gatherings
10. Humour, affection, teasing, and indirect meaning
11. Following conversations with multiple speakers
12. Weekend-with-the-in-laws simulation

## Long-term features

Potential later features include:

- personalised Family Map
- relationship-status-aware forms of address
- partner mode for confirming the family's preferred terms
- native Northern and Southern recordings
- custom family-member voice recordings
- pronunciation feedback
- spaced-repetition review
- adaptive difficulty
- AI conversation practice
- multi-speaker family simulations
- synced progress across devices
- broader regional Vietnamese listening exposure

These are roadmap items, not current V0.1 features.

## Contributing and testing

Feedback from Vietnamese speakers, Vietnamese learners, mixed-language couples, and people navigating Vietnamese family relationships is especially valuable.

The first testing priority is not advanced grammar. It is whether **Lesson 1 sounds natural, teaches socially appropriate family language, and makes a complete beginner more comfortable entering a Vietnamese family conversation.**

## License

No open-source license has been selected yet.

Unless a license is added later, the repository should not be assumed to grant permission to copy, modify, or redistribute its contents.
