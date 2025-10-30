// sw.js — superlichte offline cache
const CACHE_NAME = 'kiki-offline-v4';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest'
  // Voeg hier toe als je extra bestanden/foto's hebt, bv: './icons/icon-192.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  e.respondWith(
    caches.match(req).then(cached => 
      cached || fetch(req).then(res => {
        // Optioneel: runtime cache
        return res;
      })
    )
  );
});



