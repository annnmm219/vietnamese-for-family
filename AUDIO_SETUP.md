# Regional audio setup

Lesson 1 uses separate Northern and Southern Vietnamese MP3 files.

The website does **not** use the browser's generic `vi-VN` voice as a substitute for a regional accent. A generic device voice cannot reliably guarantee Northern versus Southern pronunciation.

## Current recommended provider: Vbee AIVoice

Vbee provides Vietnamese voices by region, including Northern, Central and Southern voices.

For this project, the simplest workflow is **manual generation on the free Vbee plan** rather than an API integration.

Why manual generation is enough:

1. each lesson sentence only needs to be generated once
2. the resulting MP3 is stored permanently in GitHub
3. learners can replay the stored MP3 without consuming any more TTS quota
4. no API key or secret is needed in the website

The current Vbee free plan provides a daily free allowance and supports downloading generated audio. Paid API access is unnecessary for the first lessons.

## Important: review the accent before approving audio

Do not trust a regional label blindly.

For every clip:

- choose a voice explicitly labelled **Northern** for `audio/north/...`
- choose a voice explicitly labelled **Southern** for `audio/south/...`
- listen to the result before adding it to the course
- reject any clip that sounds unnatural, mispronounces a tone, or does not match the intended region

The course is a language-learning product, so pronunciation quality is part of the content, not just decoration.

## How to create Lesson 1 audio

### 1. Open Vbee AIVoice

Create a free Vbee account and open Text to Speech.

Use the voice filter to select the appropriate region.

For consistency, try to use one Northern voice and one Southern voice throughout Lesson 1 unless testing shows a reason to change.

### 2. Generate the Northern version

Create each Northern phrase below and download it as MP3.

Store files in:

```text
audio/north/lesson-01/
```

Required files:

```text
vocab-mom.mp3                 mẹ
vocab-dad.mp3                 bố
vocab-self-child.mp3          con
vocab-grandfather.mp3         ông
vocab-grandmother.mp3         bà
vocab-polite-yes.mp3          vâng ạ

phrase-hello-mom.mp3          Con chào mẹ ạ.
phrase-hello-dad.mp3          Con chào bố ạ.
phrase-hello-grandparents.mp3 Cháu chào ông bà ạ.
phrase-nice-to-meet.mp3       Con rất vui được gặp bố mẹ ạ.

compare-dad-politeness.mp3    Bố. Vâng ạ.
scenario-mother-arrival.mp3   Hai đứa mới tới à?
scenario-reply.mp3            Vâng ạ, bọn con mới tới.
final-greeting.mp3            Con chào bố mẹ ạ.
```

### 3. Generate the Southern version

Store files in:

```text
audio/south/lesson-01/
```

Required files:

```text
vocab-mom.mp3                 mẹ
vocab-dad.mp3                 ba
vocab-self-child.mp3          con
vocab-grandfather.mp3         ông
vocab-grandmother.mp3         bà
vocab-polite-yes.mp3          dạ

phrase-hello-mom.mp3          Dạ, con chào mẹ.
phrase-hello-dad.mp3          Dạ, con chào ba.
phrase-hello-grandparents.mp3 Dạ, cháu chào ông bà.
phrase-nice-to-meet.mp3       Dạ, con rất vui được gặp ba mẹ.

compare-dad-politeness.mp3    Ba. Dạ.
scenario-mother-arrival.mp3   Hai đứa mới tới hả?
scenario-reply.mp3            Dạ, tụi con mới tới.
final-greeting.mp3            Dạ, con chào ba mẹ.
```

## Slow versions

For complete phrases and scenario lines, also generate a slower version and add `-slow` before `.mp3`.

Example:

```text
phrase-hello-dad.mp3
phrase-hello-dad-slow.mp3
```

Slow files are expected for:

```text
phrase-hello-mom-slow.mp3
phrase-hello-dad-slow.mp3
phrase-hello-grandparents-slow.mp3
phrase-nice-to-meet-slow.mp3
scenario-mother-arrival-slow.mp3
scenario-reply-slow.mp3
final-greeting-slow.mp3
```

Do not create slow versions of isolated one-word vocabulary unless testing shows they are useful.

## Uploading the MP3 files to GitHub

Once downloaded from Vbee:

1. open this repository on GitHub
2. choose **Add file → Upload files**
3. upload the Northern files into `audio/north/lesson-01/`
4. upload the Southern files into `audio/south/lesson-01/`
5. commit the files

GitHub Pages will then serve the audio directly.

The playback flow becomes:

```text
Vbee generation once
        ↓
review the pronunciation
        ↓
MP3 stored in GitHub
        ↓
GitHub Pages
        ↓
learner clicks 🔊 as many times as needed
```

## Why the previous FPT setup was removed

The repository previously contained an FPT.AI API generator. That approach was removed after FPT announced the discontinuation of individual services on the legacy FPT.AI Console in 2026.

The project should not depend on that retired individual workflow.

## Future automation

If the course grows to the point where manual audio creation becomes inefficient, an API-based generation pipeline can be added later using a provider that:

- explicitly supports regional Vietnamese voices
- is available internationally
- permits our intended use
- provides stable API access
- keeps credentials private

For the MVP, reviewed static MP3 files are simpler and safer.