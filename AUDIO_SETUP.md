# Regional audio setup

Lesson 1 is designed to use separate Northern and Southern Vietnamese MP3 files.

The website does **not** use the browser's generic `vi-VN` voice as a dialect substitute. This is deliberate: a device voice cannot reliably guarantee Northern vs Southern pronunciation.

## Audio provider used by the generator

The repository includes a generator for FPT.AI Text to Speech.

Current voice choices in `scripts/generate_regional_audio.py`:

- Northern: `banmai`
- Southern: `lannhi`

FPT.AI also exposes other regional Vietnamese voices, so these can be changed later after listening tests.

## One-time setup

### 1. Create an FPT.AI account and Text to Speech project

Go to the FPT.AI Console, enable Text to Speech, create a project, and create an API key.

Do **not** add the API key to `app.js`, a README, an issue, or any other public repository file.

### 2. Save the key as a GitHub Actions secret

In this GitHub repository:

**Settings → Secrets and variables → Actions → New repository secret**

Create:

```text
Name: FPT_API_KEY
Secret: <your FPT.AI API key>
```

The website never receives this secret. It is only available to the GitHub Action while generating audio files.

### 3. Run the generator

Go to:

**Actions → Generate regional Vietnamese audio → Run workflow**

Leave `Regenerate existing MP3 files` off for the first run.

The workflow will:

1. generate Northern MP3s with the configured Northern voice
2. generate Southern MP3s with the configured Southern voice
3. generate slower versions of lesson phrases and scenarios
4. save the files under `audio/north/lesson-01/` and `audio/south/lesson-01/`
5. commit the generated files back to the repository

GitHub Pages will then serve those MP3 files with the lesson.

## Why audio is pre-generated

GitHub Pages is a static website. Calling a paid or quota-limited TTS API directly from browser JavaScript would expose the API key to anyone who visits the site.

Pre-generating the audio avoids that problem:

```text
FPT.AI + private GitHub secret
          ↓
GitHub Action
          ↓
reviewed MP3 files
          ↓
GitHub Pages
          ↓
learner clicks 🔊
```

## Lesson 1 audio structure

```text
audio/
├── north/
│   └── lesson-01/
│       ├── vocab-dad.mp3
│       ├── phrase-hello-dad.mp3
│       ├── phrase-hello-dad-slow.mp3
│       └── ...
└── south/
    └── lesson-01/
        ├── vocab-dad.mp3
        ├── phrase-hello-dad.mp3
        ├── phrase-hello-dad-slow.mp3
        └── ...
```

## Quality control

AI regional labels are not enough for a language course. After generation, a native Northern speaker and a native Southern speaker should listen to every Lesson 1 file before it is treated as approved teaching audio.

Long term, important course phrases can be replaced with recordings from real native speakers without changing the lesson code, as long as the filenames stay the same.
