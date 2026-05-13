// Service Worker — Ferrières-en-Brie Patrimoine
var CACHE = "ferrieres-v2";

self.addEventListener("install", function(e) {
  self.skipWaiting();
});

self.addEventListener("activate", function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function(e) {
  // Pass through — no offline caching to avoid 404 loops
  e.respondWith(fetch(e.request).catch(function() {
    return new Response("Hors ligne", { status: 503 });
  }));
});
