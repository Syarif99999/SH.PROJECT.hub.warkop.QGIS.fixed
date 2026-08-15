// Service Worker - Peta PBB Tanah Grogot
// Strategi: cache "app shell" (halaman + ikon) supaya app tetap bisa dibuka offline.
// Peta (tile OSM), pencarian alamat (Nominatim), dan sinkron Supabase TETAP butuh
// internet seperti biasa — service worker ini sengaja tidak menyentuh permintaan itu.

const CACHE_NAME = 'peta-pbb-shell-v1';
const APP_SHELL = [
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Hanya tangani GET dari origin sendiri (file app shell).
  // Permintaan ke domain lain (tile peta, Nominatim, Supabase, CDN library)
  // dibiarkan lewat langsung ke jaringan, tidak di-cache.
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return res;
        })
        .catch(() => cached);
      // Network-first untuk HTML supaya update terbaru selalu diambil kalau online,
      // fallback ke cache kalau offline.
      return req.mode === 'navigate' ? network : (cached || network);
    })
  );
});
