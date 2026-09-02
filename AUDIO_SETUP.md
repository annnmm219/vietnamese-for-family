# Regional audio setup

Lesson 1 uses two reviewed master MP3 files:

```text
audio/north/lesson-01/master.mp3
audio/south/lesson-01/master.mp3
```

- `north` contains the HN recording.
- `south` contains the SG recording.

The website does not use the browser's generic `vi-VN` voice as a substitute for a regional accent.

## Current implementation

`app.js` contains an audio cue map for all 14 lesson items in each master recording. When a learner clicks a pronunciation button, the app:

1. loads the correct HN or SG master file
2. seeks to the start of the selected word or phrase
3. plays only that cue
4. stops at the configured endpoint

The **Slow** button uses the same approved regional recording at a reduced playback rate. Separate slow MP3 files are not required.

## Required files

### Northern

Upload the approved HN master recording as:

```text
audio/north/lesson-01/master.mp3
```

It must contain these items in this order:

```text
mẹ
bố
con
ông
bà
vâng ạ
Con chào mẹ ạ.
Con chào bố ạ.
Cháu chào ông bà ạ.
Con rất vui được gặp bố mẹ ạ.
Bố. Vâng ạ.
Hai đứa mới tới à?
Vâng ạ, bọn con mới tới.
Con chào bố mẹ ạ.
```

### Southern

Upload the approved SG master recording as:

```text
audio/south/lesson-01/master.mp3
```

It must contain these items in this order:

```text
mẹ
ba
con
ông
bà
dạ
Dạ, con chào mẹ.
Dạ, con chào ba.
Dạ, cháu chào ông bà.
Dạ, con rất vui được gặp ba mẹ.
Ba. Dạ.
Hai đứa mới tới hả?
Dạ, tụi con mới tới.
Dạ, con chào ba mẹ.
```

## Creating future audio

For future lessons:

1. use one HN voice consistently for the Northern track
2. use one SG voice consistently for the Southern track
3. place a clear pause between items
4. listen to every generated phrase before approval
5. keep the approved master recording as the source file
6. add its cue timings to the lesson data

This approach avoids exposed API credentials, repeated TTS use, and dozens of tiny audio files while preserving real regional pronunciation.
