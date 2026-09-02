# Regional audio strategy

## Decision: finish the curriculum first

Do **not** generate final HN/SG audio lesson by lesson.

The course will first be built and reviewed through all planned lessons. Once the Vietnamese wording is locked, the repository will produce a consolidated audio manifest for Northern and Southern Vietnamese.

The intended production flow is:

```text
Lessons 1–12 complete
        ↓
Vietnamese wording audit
        ↓
remove duplicate words and phrases
        ↓
HN master production script
SG master production script
        ↓
generate regional recordings in one production session
        ↓
review pronunciation
        ↓
store approved masters in GitHub
        ↓
map lesson buttons to cue timings
```

## Lesson 1 proof of concept

Lesson 1 already proved that the technical approach works with two regional master files:

```text
audio/north/lesson-01/master.mp3
audio/south/lesson-01/master.mp3
```

`app.js` can seek to individual cue ranges inside those master recordings, so the website does not need dozens of tiny MP3 files.

The **Slow** button replays the same approved recording at a lower playback rate. Separate slow recordings are unnecessary.

The website also does not use the browser's generic `vi-VN` voice as a substitute for a regional accent.

## Lessons 2 onward

Lessons 2 onward deliberately show **Audio queued** while their wording is still under curriculum review.

This prevents us from paying for, downloading, uploading and mapping recordings that may later be rewritten.

When the full course is locked, use:

- one consistent HN voice for the Northern track
- one consistent SG voice for the Southern track
- clear pauses between production-script items
- native-speaker quality control before approval

## Audio deduplication

Repeated material should only be produced once where technically practical.

For example, common items such as:

```text
mẹ
ba
bố
con
dạ
vâng ạ
cảm ơn
```

should be reused rather than regenerated in every lesson.

The final audio manifest should therefore be generated from the complete course data, not written manually lesson by lesson.
