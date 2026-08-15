const CACHE_NAME = 'warkop-hub-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // PENTING: hanya tangani file hub sendiri (root: index.html, manifest, icon).
  // Semua permintaan lain (termasuk ke folder reklame/, hotel/, dst) DIABAIKAN
  // total (tidak respondWith) supaya tidak pernah membajak/menutupi permintaan
  // ke sub-aplikasi, dan browser mengambilnya langsung dari jaringan seperti biasa.
  const url = new URL(event.request.url);
  const scopePath = new URL(self.registration.scope).pathname; // path folder hub, mis. "/" atau "/WARKOP_HUB/"
  const hubFileNames = ['', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png'];
  const relativePath = url.pathname.startsWith(scopePath) ? url.pathname.slice(scopePath.length) : null;
  const isHubAsset = relativePath !== null && hubFileNames.includes(relativePath);

  if (!isHubAsset) return; // biarkan lewat apa adanya, tidak diintersep sama sekali

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
