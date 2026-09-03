# Vietnamese for Family

**An interactive Vietnamese course for people who want to communicate with their Vietnamese partner, in-laws, and extended family.**

> Learn the Vietnamese your family speaks.

## Project status

**V0.6: mobile-first MVP with the locked 10-lesson architecture.**

The project is a lightweight installable web app hosted on GitHub Pages. It works as a normal website, is designed primarily for phone use, and can be added to a phone home screen as a Progressive Web App (PWA).

Northern and Southern Vietnamese are parallel learning tracks selected at the top of the app. Once a track is selected, the lesson teaches that track rather than forcing the learner to study the other region at the same time.

## Official 10-lesson course

1. **Meeting the Family** — titles, kinship hierarchy, relational pronouns, and initial greetings
2. **Politeness & Natural Responses** — respectful acknowledgements, softeners, and warm family responses
3. **Food & Family Meals** — table invitations, dishes, compliments, and politely declining more food
4. **Helping Around the House** — household objects, chores, simple requests, and offering assistance
5. **Questions from Relatives** — age, career, relationships, children, appearance, and graceful non-answers
6. **Work, Home & Plans** — describing work, living situation, interests, and future plans simply
7. **Everyday Family Small Talk** — health, weather, routines, check-ins, and conversational fillers
8. **Understanding Natural, Fast Vietnamese** — connected speech, rhythm, contextual omissions, and fast family dialogue
9. **Tết & Family Visits** — seasonal wishes, visiting etiquette, lì xì, altar etiquette, and host/guest dynamics
10. **Surviving a Family Gathering** — capstone simulation integrating the entire course

## Current build status

Playable authored lessons:

- Lesson 1: Meeting the Family
- Lesson 2: Politeness & Natural Responses
- Lesson 3: Food & Family Meals
- Lesson 4: Helping Around the House
- Lesson 5: Questions from Relatives
- Lesson 6: Work, Home & Plans

Still to be authored:

- Lesson 7: Everyday Family Small Talk
- Lesson 8: Understanding Natural, Fast Vietnamese
- Lesson 9: Tết & Family Visits
- Lesson 10: Surviving a Family Gathering

## Lesson 1 reference implementation

Lesson 1 is the current full MVP reference lesson. It includes:

- Northern and Southern regional wording
- approved Northern and Southern voice recordings
- pronunciation for all six vocabulary items
- audio for all four useful phrases
- normal and slow playback for phrases and scenarios
- spoken final family scenario
- spoken model reply after completing the scenario
- final completion audio
- three comprehension checks
- progress stored locally in the browser

For mobile performance, the approved Lesson 1 master recordings are packaged into short regional audio groups so the phone does not need to download a large audio file for every tap.

## Mobile app / PWA

The project includes:

- responsive phone-first layout
- horizontal lesson navigation optimized for touch
- 44+ px touch targets for primary controls
- standalone app manifest
- app icons
- service-worker caching for core course files and Lesson 1 audio
- Android/browser install prompt where supported
- iPhone compatibility through Safari's **Add to Home Screen** flow

This is intentionally a PWA rather than a native iOS/Android app for the MVP. It keeps one codebase, remains easy to publish through GitHub Pages, and can later be wrapped or rebuilt natively only if testing shows a real need.

## Audio strategy

Lesson 1 proves the final audio interaction. Audio for Lessons 2–10 is still deferred until all curriculum wording is locked.

After all ten lessons are authored and audited, the project will:

1. extract all required spoken material
2. deduplicate repeated vocabulary and phrases
3. create final Northern and Southern production scripts
4. generate the regional audio in one production session
5. review pronunciation
6. integrate optimized mobile audio files
7. add them to the offline cache

See `AUDIO_SETUP.md` for the production approach.

## Project structure

```text
vietnamese-for-family/
├── index.html
├── styles.css
├── course.css
├── mobile.css
├── app.js
├── course-data.js
├── lesson-2.js
├── manifest.webmanifest
├── sw.js
├── icon-192.png
├── icon-512.png
├── README.md
├── AUDIO_SETUP.md
└── audio/
    ├── north/
    └── south/
```

## Design principles

1. Family situations before tourist vocabulary.
2. One selected regional track at a time.
3. Speaking and listening before formal grammar terminology.
4. Natural family Vietnamese rather than mechanical English translation.
5. Relationship terms taught inside actual relationships.
6. Cultural meaning taught alongside literal meaning.
7. Short, touch-friendly sessions rather than textbook chapters.
8. Final audio only after wording is locked.
9. Lesson 8 becomes listening-heavy rather than vocabulary-heavy.
10. Lesson 10 is a capstone simulation, not another vocabulary chapter.

## GitHub Pages

Expected public URL:

```text
https://annnmm219.github.io/vietnamese-for-family/
```

## License

No open-source license has been selected yet. Unless a license is added later, the repository should not be assumed to grant permission to copy, modify or redistribute its contents.
