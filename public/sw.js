const CACHE_NAME = "brooklin-pub-v1";
const urlsToCache = [
  "/",
  "/static/js/bundle.js",
  "/static/css/main.css",
  "/images/brooklinpub-logo.png",
  "/brands/3speed.webp",
  "/brands/alexkeith.webp",
  "/brands/budl.webp",
  "/brands/budwei.webp",
  "/brands/goose.webp",
  "/brands/guineess.webp",
  "/brands/harpp.webp",
  "/brands/landshark.webp",
  "/brands/mitchelob.webp",
  "/brands/perioni.webp",
  "/brands/somerbby.webp",
  "/brands/stella.webp",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request);
    })
  );
});
