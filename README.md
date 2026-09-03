# Vietnamese for Family

**An interactive Vietnamese course for people who want to communicate with their Vietnamese partner, in-laws, and extended family.**

> Learn the Vietnamese your family speaks.

## Project status

**V0.7: Lessons 1–7 are authored and playable in the mobile-first MVP.**

The project is a lightweight installable web app hosted on GitHub Pages. It works as a normal website, is designed primarily for phone use, and can be added to a phone home screen as a Progressive Web App (PWA).

Northern and Southern Vietnamese are parallel learning tracks selected at the top of the app. Once a track is selected, the lesson teaches that track rather than forcing the learner to study the other region at the same time.

## Official 10-lesson course

1. **Meeting the Family**: titles, kinship hierarchy, relational pronouns, and initial greetings
2. **Politeness & Natural Responses**: respectful acknowledgements, softeners, and warm family responses
3. **Food & Family Meals**: table invitations, dishes, compliments, and politely declining more food
4. **Helping Around the House**: household objects, chores, simple requests, and offering assistance
5. **Questions from Relatives**: age, career, relationships, children, appearance, and graceful non-answers
6. **Work, Home & Plans**: describing work, living situation, interests, and future plans simply
7. **Everyday Family Small Talk**: health, weather, routines, check-ins, and conversational follow-ups
8. **Understanding Natural, Fast Vietnamese**: connected speech, rhythm, contextual omissions, and fast family dialogue
9. **Tết & Family Visits**: seasonal wishes, visiting etiquette, lì xì, altar etiquette, and host/guest dynamics
10. **Surviving a Family Gathering**: capstone simulation integrating the entire course

## Current build status

Playable authored lessons:

- Lesson 1: Meeting the Family
- Lesson 2: Politeness & Natural Responses
- Lesson 3: Food & Family Meals
- Lesson 4: Helping Around the House
- Lesson 5: Questions from Relatives
- Lesson 6: Work, Home & Plans
- Lesson 7: Everyday Family Small Talk

Still to be authored:

- Lesson 8: Understanding Natural, Fast Vietnamese
- Lesson 9: Tết & Family Visits
- Lesson 10: Surviving a Family Gathering

## Lesson 7 design

Lesson 7 deliberately shifts from transactional phrases toward conversational participation. It teaches learners to:

- ask how family members have been
- say they are well, tired, or busy
- comment on simple shared topics such as the weather
- react with a short natural follow-up
- add one related question instead of ending the exchange with a bare yes/no answer

Audio for Lesson 7 is intentionally deferred until the full curriculum is locked.

## Mobile app / PWA

The project includes:

- responsive phone-first layout
- horizontal lesson navigation optimized for touch
- 44+ px touch targets for primary controls
- standalone app manifest
- app icons
- service-worker caching for core course files
- Android/browser install prompt where supported
- iPhone compatibility through Safari's **Add to Home Screen** flow

This is intentionally a PWA rather than a native iOS/Android app for the MVP. It keeps one codebase and remains easy to publish through GitHub Pages.

## Audio strategy

Audio production is now treated as a later content-lock phase rather than something that blocks curriculum development.

Lesson 1 remains an experimental audio reference. The current Northern MVP uses exact visible text through a Vietnamese device voice because the earlier sliced Northern recording map proved unreliable. Final production should use clean individual audio files per word, phrase, sentence, and scenario rather than tiny seeks inside long MP3 masters.

After all ten lessons are authored and audited, the project will:

1. lock all Northern and Southern wording
2. extract all required spoken material
3. deduplicate repeated vocabulary and phrases
4. create final Northern and Southern production scripts
5. generate clean individual audio files
6. review pronunciation
7. integrate normal and slow playback
8. add final audio to the offline cache

See `AUDIO_SETUP.md` for the production approach.

## Project structure

```text
vietnamese-for-family/
├── index.html
├── styles.css
├── course.css
├── mobile.css
├── app.js
├── audio-fix.js
├── course-data.js
├── lesson-2.js
├── lesson-7.js
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
