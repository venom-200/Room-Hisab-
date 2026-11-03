/* Maa Kinjeswari Fast Food - service worker */
const VERSION = 'mkff-app-v1';
const SHELL = [
  './', './index.html', './manifest.webmanifest',
  './icon-64.png', './icon-180.png',
  './icon-192.png', './icon-512.png',
  './icon-512-maskable.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // never cache the database / auth calls
  if (url.hostname.indexOf('firebaseio.com') !== -1 ||
      url.hostname.indexOf('googleapis.com') !== -1 ||
      url.hostname.indexOf('firebasedatabase.app') !== -1) return;

  // pages: network first, fall back to the cached app
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put('./index.html', copy)).catch(() => {});
        return res;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // everything else: cache first, refresh in background
  e.respondWith(
    caches.match(req).then(cached => {
      const net = fetch(req).then(res => {
        if (res && (res.ok || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(VERSION).then(c => c.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() => cached);
      return cached || net;
    })
  );
});
