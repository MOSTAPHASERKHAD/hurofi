const CACHE = 'hurofi-v1';
const ASSETS = [
  '/',
  '/audio/letters/',
  '/audio/phonemes/',
  '/audio/words/',
  '/audio/encouragement/',
  '/images/letters/',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('/audio/') || e.request.url.includes('/images/')) {
    e.respondWith(
      caches.open(CACHE).then((cache) => {
        return cache.match(e.request).then((cached) => {
          return cached || fetch(e.request).then((fetched) => {
            cache.put(e.request, fetched.clone());
            return fetched;
          });
        });
      })
    );
  }
});
