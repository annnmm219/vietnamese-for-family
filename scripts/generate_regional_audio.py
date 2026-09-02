from __future__ import annotations

import argparse
import os
import sys
import time
from pathlib import Path

import requests

API_URL = "https://api.fpt.ai/hmi/tts/v5"

VOICES = {
    "north": "banmai",   # FPT.AI female Northern voice
    "south": "lannhi",   # FPT.AI female Southern voice
}

# Stable lesson audio. Personalised learner-name audio intentionally stays out of
# this list because static GitHub Pages cannot pre-generate arbitrary names.
LESSON_AUDIO = {
    "north": {
        "vocab-mom": "mẹ",
        "vocab-dad": "bố",
        "vocab-self-child": "con",
        "vocab-grandfather": "ông",
        "vocab-grandmother": "bà",
        "vocab-polite-yes": "vâng ạ",
        "phrase-hello-mom": "Con chào mẹ ạ.",
        "phrase-hello-dad": "Con chào bố ạ.",
        "phrase-hello-grandparents": "Cháu chào ông bà ạ.",
        "phrase-nice-to-meet": "Con rất vui được gặp bố mẹ ạ.",
        "compare-dad-politeness": "Bố. Vâng ạ.",
        "scenario-mother-arrival": "Hai đứa mới tới à?",
        "scenario-reply": "Vâng ạ, bọn con mới tới.",
        "final-greeting": "Con chào bố mẹ ạ.",
    },
    "south": {
        "vocab-mom": "mẹ",
        "vocab-dad": "ba",
        "vocab-self-child": "con",
        "vocab-grandfather": "ông",
        "vocab-grandmother": "bà",
        "vocab-polite-yes": "dạ",
        "phrase-hello-mom": "Dạ, con chào mẹ.",
        "phrase-hello-dad": "Dạ, con chào ba.",
        "phrase-hello-grandparents": "Dạ, cháu chào ông bà.",
        "phrase-nice-to-meet": "Dạ, con rất vui được gặp ba mẹ.",
        "compare-dad-politeness": "Ba. Dạ.",
        "scenario-mother-arrival": "Hai đứa mới tới hả?",
        "scenario-reply": "Dạ, tụi con mới tới.",
        "final-greeting": "Dạ, con chào ba mẹ.",
    },
}


def request_audio(api_key: str, text: str, voice: str, speed: int) -> str:
    response = requests.post(
        API_URL,
        headers={
            "api_key": api_key,
            "voice": voice,
            "speed": str(speed),
            "format": "mp3",
            "Cache-Control": "no-cache",
        },
        data=text.encode("utf-8"),
        timeout=30,
    )
    response.raise_for_status()
    payload = response.json()
    if payload.get("error") != 0 or not payload.get("async"):
        raise RuntimeError(f"FPT.AI TTS error: {payload}")
    return payload["async"]


def download_when_ready(url: str, destination: Path) -> None:
    last_status = None
    for _ in range(60):
        response = requests.get(url, timeout=30)
        last_status = response.status_code
        content_type = response.headers.get("content-type", "")
        if response.ok and ("audio" in content_type or response.content[:3] == b"ID3"):
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_bytes(response.content)
            return
        time.sleep(2)
    raise TimeoutError(f"Audio was not ready in time: {url} (last HTTP {last_status})")


def generate_file(api_key: str, dialect: str, audio_id: str, text: str, speed: int, force: bool) -> None:
    suffix = "-slow" if speed < 0 else ""
    destination = Path("audio") / dialect / "lesson-01" / f"{audio_id}{suffix}.mp3"
    if destination.exists() and not force:
        print(f"skip  {destination}")
        return

    print(f"make  {destination}: {text}")
    async_url = request_audio(api_key, text, VOICES[dialect], speed)
    download_when_ready(async_url, destination)


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate Northern and Southern Vietnamese Lesson 1 MP3 files using FPT.AI.")
    parser.add_argument("--force", action="store_true", help="Regenerate files that already exist.")
    args = parser.parse_args()

    api_key = os.environ.get("FPT_API_KEY", "").strip()
    if not api_key:
        print("FPT_API_KEY is missing. Add it as a GitHub Actions repository secret.", file=sys.stderr)
        return 2

    for dialect, items in LESSON_AUDIO.items():
        for audio_id, text in items.items():
            generate_file(api_key, dialect, audio_id, text, speed=0, force=args.force)

            # Slow versions are most useful for complete phrases and scenarios,
            # not isolated one-word vocabulary cards.
            if audio_id.startswith("phrase-") or audio_id.startswith("scenario-") or audio_id == "final-greeting":
                generate_file(api_key, dialect, audio_id, text, speed=-2, force=args.force)

    print("Regional audio generation complete.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
