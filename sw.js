const CACHE_NAME = "vff-v0.10.2";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./course.css",
  "./lesson-8.css",
  "./lesson-9.css",
  "./lesson-10.css",
  "./mobile.css",
  "./hero-tuning.css",
  "./course-data.js",
  "./lesson-2.js",
  "./lesson-7.js",
  "./lesson-8.js",
  "./lesson-9.js",
  "./lesson-10.js",
  "./regional-pronouns.js",
  "./regional-sanity.js",
  "./app.js",
  "./audio-fix.js",
  "./lesson-8-ui.js",
  "./lesson-9-ui.js",
  "./lesson-10-ui.js",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./audio/north/lesson-01/vocab-a.mp3",
  "./audio/north/lesson-01/vocab-b.mp3",
  "./audio/north/lesson-01/phrases-a.mp3",
  "./audio/north/lesson-01/phrases-b.mp3",
  "./audio/north/lesson-01/scenario-a.mp3",
  "./audio/north/lesson-01/scenario-b.mp3",
  "./audio/south/lesson-01/vocab-a.mp3",
  "./audio/south/lesson-01/vocab-b.mp3",
  "./audio/south/lesson-01/phrases-a.mp3",
  "./audio/south/lesson-01/phrases-b1.mp3",
  "./audio/south/lesson-01/phrases-b2.mp3",
  "./audio/south/lesson-01/scenario-a.mp3",
  "./audio/south/lesson-01/scenario-b.mp3"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  if (url.pathname.endsWith(".js") || url.pathname.endsWith(".css")) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
