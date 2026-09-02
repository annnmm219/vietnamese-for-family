# Vietnamese for Family

**An interactive Vietnamese course for people who want to communicate with their Vietnamese partner, in-laws, and extended family.**

> Speak one dialect. Understand both.

## Project status

**V0.3: Lessons 1–5 are playable.**

The project is a lightweight static web app designed for GitHub Pages. It does not require an account or backend for the current course experience.

### Current lessons

1. **Meeting the Family** — greetings, parents, grandparents, family pronouns, first-door interaction
2. **Food and Family Meals** — eating, compliments, accepting and declining more food, kitchen vocabulary
3. **Questions from Relatives** — age, work, relationship duration, marriage questions, polite deflection
4. **Work, Home and Plans** — simple small talk about work, where you live, likes and plans as a couple
5. **Helping Around the House** — offering help, dishes, household requests and where things belong

Each lesson includes:

- Northern and Southern Vietnamese tracks
- one active speaking variety with recognition of the other
- six high-value words or expressions
- fixed useful phrases
- a reusable response pattern
- North/South comparison
- three interactive comprehension checks
- a final family scenario
- progress stored locally in the browser

## Northern and Southern Vietnamese

The course treats both varieties as first-class tracks:

- **Northern Vietnamese**, primarily Hanoi-oriented
- **Southern Vietnamese**, primarily Saigon / Ho Chi Minh City-oriented

The learner chooses one variety to actively speak while learning to recognise common alternatives from the other.

Examples:

| English | Northern | Southern |
| --- | --- | --- |
| Dad | bố | ba |
| Bowl / dishes | bát | chén |
| Spoon | thìa | muỗng |
| We / us in this family context | bọn con | tụi con |
| Polite acknowledgement | vâng ạ | dạ |

These are teaching defaults, not rigid claims about every Vietnamese household. Family, generation and region can all affect real usage.

## Audio strategy

Final audio is **not** being produced lesson by lesson.

Lesson 1 proved the technical model: one HN master recording and one SG master recording can contain many lesson cues, while the app seeks to the correct section when the learner taps a pronunciation button.

For Lessons 2 onward the interface currently shows **Audio queued**.

The production plan is:

1. finish the full curriculum
2. audit and lock all Northern and Southern wording
3. generate a consolidated audio manifest
4. deduplicate repeated vocabulary and phrases
5. create HN and SG master production scripts
6. generate the regional audio in one production session
7. review pronunciation
8. store approved master recordings in GitHub
9. map every audio button to the correct cue

See `AUDIO_SETUP.md` for the current production strategy.

## Project structure

```text
vietnamese-for-family/
├── index.html
├── styles.css
├── course.css
├── app.js
├── course-data.js
├── README.md
├── AUDIO_SETUP.md
└── audio/
    ├── north/
    └── south/
```

`course-data.js` contains the authored course content. `app.js` is the reusable lesson engine. This separation makes Lessons 6–12 substantially easier to add and later allows the final audio manifest to be generated from the complete course data.

## Design principles

1. **Family situations before generic tourist vocabulary.**
2. **Speaking and listening before formal grammar study.**
3. **One active dialect, two-dialect recognition.**
4. **Natural family Vietnamese instead of mechanical translation.**
5. **Relationship terms taught inside actual relationships.**
6. **Cultural meaning taught alongside literal meaning.**
7. **Short interactive sessions rather than textbook chapters.**
8. **Do not produce final audio until wording is locked.**

## Planned course

The current roadmap remains a 12-lesson family-focused program. Lessons 1–5 are implemented; Lessons 6–12 will cover deeper small talk, natural listening, politeness, Tết and extended family, humour and indirect meaning, multi-speaker conversation, and a final weekend-with-the-family simulation.

## GitHub Pages

The project is intended to run from GitHub Pages from the `main` branch.

Expected public URL:

```text
https://annnmm219.github.io/vietnamese-for-family/
```

## License

No open-source license has been selected yet. Unless a license is added later, the repository should not be assumed to grant permission to copy, modify or redistribute its contents.
