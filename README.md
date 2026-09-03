# Vietnamese for Family

**An interactive Vietnamese course for people who want to communicate with their Vietnamese partner, in-laws, and extended family.**

> Learn the Vietnamese your family speaks.

## Project status

**V0.10: all 10 lessons are authored and playable in the mobile-first MVP.**

The curriculum is now complete enough for **native-speaker language validation**, but the wording is not yet considered locked. Audio production and the richer visual/interactivity pass intentionally come after that validation.

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
8. **Understanding Natural, Fast Vietnamese**: anchor-word recognition, contextual omissions, and short natural family speech
9. **Tết & Family Visits**: seasonal wishes, visiting etiquette, lì xì, altar etiquette, and host/guest dynamics
10. **Surviving a Family Gathering**: continuous capstone simulation integrating the entire course

## Current build status

All ten lessons are playable.

Lesson 8 deliberately breaks from the normal vocabulary-heavy lesson pattern and trains learners to catch strong signals, infer omitted context, and understand short natural family speech.

Lesson 9 uses a five-step family-visit flow and explicitly avoids treating variable household customs as universal Vietnamese rules.

Lesson 10 is a seven-scene continuous family gathering: arrival, meal, personal question, teasing, overlapping conversation, toast, and leaving. It introduces no vocabulary list and instead tests reuse of Lessons 1–9.

## Native-speaker validation

Two reviewer packs live in `validation/`:

- `validation/NORTHERN_VALIDATION.md`
- `validation/SOUTHERN_VALIDATION.md`

They contain the regional words, phrases, family prompts, replies and simulation lines that the course intends to teach. Each item has a stable ID so native speakers can return only the items they would change and the everyday wording they would actually use.

The current course convention to validate is:

- Northern grandparents: learner self-reference `cháu`
- Southern grandparents: learner self-reference `con`
- Parents in both tracks: learner self-reference `con`

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

Audio is deliberately paused until native-speaker wording is validated.

Lesson 1 proved that seeking tiny segments inside longer MP3 masters is too fragile for a language-learning product. Final production should use **clean individual audio files per word, phrase, sentence and scenario**, with the app controlling slow playback from those approved files.

After validation, the project will:

1. apply Northern and Southern reviewer corrections
2. lock all visible wording
3. extract and deduplicate final spoken material
4. generate clean Northern and Southern audio files
5. review every recording against the visible text
6. integrate normal and slow playback
7. add final audio to the offline cache

See `AUDIO_SETUP.md` for the current audio history and production approach.

## Interaction roadmap after audio

Once language and sound are stable, the second interaction pass can add:

- purposeful family-scene illustrations
- tappable household and meal objects
- sentence-building/reordering
- branching micro-dialogues
- listening-first interactions for Lesson 8
- richer multi-speaker staging for Lesson 10

The goal is not to decorate every screen. Visuals and interactions should make a specific language task easier to understand or remember.

## Project structure

```text
vietnamese-for-family/
├── index.html
├── styles.css
├── course.css
├── mobile.css
├── lesson-8.css
├── lesson-9.css
├── lesson-10.css
├── app.js
├── audio-fix.js
├── course-data.js
├── lesson-2.js
├── lesson-7.js
├── lesson-8.js
├── lesson-8-ui.js
├── lesson-9.js
├── lesson-9-ui.js
├── lesson-10.js
├── lesson-10-ui.js
├── regional-pronouns.js
├── validation/
│   ├── NORTHERN_VALIDATION.md
│   └── SOUTHERN_VALIDATION.md
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
8. Validate wording before final audio production.
9. Lesson 8 is comprehension-heavy rather than vocabulary-heavy.
10. Lesson 10 is a capstone simulation, not another vocabulary chapter.

## GitHub Pages

Expected public URL:

```text
https://annnmm219.github.io/vietnamese-for-family/
```

## License

No open-source license has been selected yet. Unless a license is added later, the repository should not be assumed to grant permission to copy, modify or redistribute its contents.
