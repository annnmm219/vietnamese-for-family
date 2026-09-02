# Vietnamese for Family

**An interactive Vietnamese course for people who want to communicate with their Vietnamese partner, in-laws, and extended family.**

> Learn the Vietnamese your family speaks.

## Project status

**V0.5: the final 10-lesson course architecture is locked and the website has been realigned to it.**

The app remains a lightweight static site designed for GitHub Pages. Northern and Southern Vietnamese are parallel learning tracks selected at the top of the site; they are not separate lessons.

## Official 10-lesson course architecture

1. **Meeting the Family**  
   Titles, kinship hierarchy, relational pronouns, and initial greetings.

2. **Politeness & Natural Responses**  
   Respectful markers such as `dạ` / `ạ`, sentence softeners, and natural family tone.

3. **Food & Family Meals**  
   Table invitations, dishes, compliments, and politely declining more food.

4. **Helping Around the House**  
   Household objects, chores, simple requests, and offering assistance.

5. **Questions from Relatives**  
   Age, career, salary, relationships, children, appearance, and graceful non-answers.

6. **Work, Home & Plans**  
   Describing work, living situation, interests, and future plans simply.

7. **Everyday Family Small Talk**  
   Health, weather, routines, check-ins, and conversational fillers.

8. **Understanding Natural, Fast Vietnamese**  
   Connected and reduced speech, sentence rhythm, contextual omissions, and fast family dialogue.

9. **Tết & Family Visits**  
   Seasonal wishes, visiting etiquette, lì xì, altar etiquette, and host/guest dynamics.

10. **Surviving a Family Gathering**  
    Capstone simulation integrating greetings, dining, questions, teasing, toasting, multi-speaker chatter, and leaving politely.

## Current build status

Playable authored lessons:

- Lesson 1: Meeting the Family
- Lesson 3: Food & Family Meals
- Lesson 4: Helping Around the House
- Lesson 5: Questions from Relatives
- Lesson 6: Work, Home & Plans

Locked but still to be authored:

- Lesson 2: Politeness & Natural Responses
- Lesson 7: Everyday Family Small Talk
- Lesson 8: Understanding Natural, Fast Vietnamese
- Lesson 9: Tết & Family Visits
- Lesson 10: Surviving a Family Gathering

The website shows all ten lesson positions so the final learning sequence remains visible while content is developed.

## Regional track strategy

The learner selects either:

- **Northern Vietnamese**, primarily Hanoi-oriented
- **Southern Vietnamese**, primarily Saigon / Ho Chi Minh City-oriented

Once a track is selected, the lesson teaches that track. The learner is not forced to study the other region's vocabulary inside the lesson.

## Audio strategy

Final audio is not being produced lesson by lesson.

Lesson 1 proved the technical model using one HN master recording and one SG master recording with timed cues. After all ten lessons are authored and wording is locked, the project will:

1. extract all required spoken material
2. deduplicate repeated vocabulary and phrases
3. create final HN and SG master production scripts
4. generate the audio in one production session
5. review pronunciation
6. store approved recordings in GitHub
7. map the lesson buttons to the correct audio cues

See `AUDIO_SETUP.md` for the current audio approach.

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

`course-data.js` is the authored curriculum source. `app.js` is the reusable lesson engine.

## Design principles

1. Family situations before tourist vocabulary.
2. One selected regional track at a time.
3. Speaking and listening before formal grammar terminology.
4. Natural family Vietnamese rather than mechanical English translation.
5. Relationship terms taught inside actual relationships.
6. Cultural meaning taught alongside literal meaning.
7. Short interactive sessions rather than textbook chapters.
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
