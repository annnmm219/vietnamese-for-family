# Vietnamese for Family

**An interactive Vietnamese course for people who want to communicate with their Vietnamese partner, in-laws, and extended family.**

> Learn the Vietnamese your family speaks.

## Project status

**V0.11: all 10 lessons are playable, Northern and Southern course wording has completed native-speaker review, and Southern Lessons 1–5 now include a free-response benchmark beta.**

The project is a lightweight installable web app hosted on GitHub Pages. It works as a normal website, is designed primarily for phone use, and can be added to a phone home screen as a Progressive Web App (PWA).

Northern and Southern Vietnamese remain parallel learning tracks. The curriculum is authored and controlled; AI-oriented work is being added to the practice and evaluation layer rather than allowing a model to redefine what is taught.

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

Northern and Southern course wording has completed native-speaker review. The current locked course convention is:

- Northern grandparents: learner self-reference `cháu`
- Southern grandparents: learner self-reference `con`
- Parents in both tracks: learner self-reference `con`

Reviewer source packs remain in `validation/` for traceability.

## Southern Gold Set V1

The first evaluator benchmark focuses on Southern Vietnamese across Lessons 1–5.

It contains **120 learner-response cases**, 24 per lesson, covering:

- correct and natural responses
- acceptable variation
- correct meaning but unnatural wording
- politeness/register errors
- kinship and regional-pronoun errors
- grammar errors
- meaning errors
- ambiguous responses

The benchmark scores six dimensions on a 0–5 scale:

- meaning
- politeness
- kinship language
- naturalness
- cultural fit
- grammar

Runtime data is split into five verified modules:

```text
southern-gold-set-v1-l1.js
southern-gold-set-v1-l2.js
southern-gold-set-v1-l3.js
southern-gold-set-v1-l4.js
southern-gold-set-v1-l5.js
```

## Southern free-response beta

When **Southern** is selected, Lessons 1–5 now show an optional **Say it in your own words** practice card.

The current local beta is intentionally conservative:

- if the typed answer matches a labeled Gold Set response, the app shows the benchmark label, feedback and six-dimension scores
- if the typed answer matches the native-approved canonical response, it is accepted even when that exact line is not one of the 120 labeled cases
- genuinely new wording is marked **Not in Gold Set V1 yet** rather than being guessed at by deterministic code
- the native-approved reference remains available for comparison

This is not yet the final AI evaluator. The next evaluator phase will use the same scenario context and benchmark to measure model agreement, false corrections and missed material errors on novel responses.

## Mobile app / PWA

The project includes:

- responsive phone-first layout
- hidden slide-out lesson sidebar
- compact Northern/Southern accent selector in the header
- 44+ px touch targets for primary controls
- standalone app manifest
- app icons
- service-worker caching for core course and benchmark files
- Android/browser install prompt where supported
- iPhone compatibility through Safari's **Add to Home Screen** flow

This is intentionally a PWA rather than a native iOS/Android app for the MVP. It keeps one codebase and remains easy to publish through GitHub Pages.

## Audio strategy

Audio remains a separate production pass.

Lesson 1 proved that seeking tiny segments inside longer MP3 masters is too fragile for a language-learning product. Final production should use **clean individual audio files per word, phrase, sentence and scenario**, with the app controlling slow playback from those approved files.

The next audio pass should:

1. extract and deduplicate final spoken material
2. generate clean Northern and Southern audio files
3. review every recording against the visible text
4. integrate normal and slow playback
5. add final audio to the offline cache

See `AUDIO_SETUP.md` for the current audio history and production approach.

## Interaction roadmap

The richer interaction pass can add:

- purposeful family-scene illustrations
- tappable household and meal objects
- sentence-building/reordering
- branching micro-dialogues
- listening-first interactions for Lesson 8
- richer multi-speaker staging for Lesson 10
- free-form AI role-play after the evaluator is reliable

The goal is not to decorate every screen. Visuals and interactions should make a specific language task easier to understand, remember or perform.

## Project structure

```text
vietnamese-for-family/
├── index.html
├── styles.css
├── course.css
├── mobile.css
├── hero-tuning.css
├── shell-layout.css
├── southern-practice.css
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
├── regional-sanity.js
├── southern-gold-set-v1-l1.js
├── southern-gold-set-v1-l2.js
├── southern-gold-set-v1-l3.js
├── southern-gold-set-v1-l4.js
├── southern-gold-set-v1-l5.js
├── southern-practice-ui.js
├── shell-layout.js
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
8. Keep curriculum deterministic; use AI for ambiguous practice and evaluation.
9. Lesson 8 is comprehension-heavy rather than vocabulary-heavy.
10. Lesson 10 is a capstone simulation, not another vocabulary chapter.

## GitHub Pages

Expected public URL:

```text
https://annnmm219.github.io/vietnamese-for-family/
```

## License

No open-source license has been selected yet. Unless a license is added later, the repository should not be assumed to grant permission to copy, modify or redistribute its contents.
