const cacheName = 'My js stuff';
const cacheVersion = '1.0.0'

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(`${cacheName} ${cacheVersion}`).then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.webmanifest',
        './canvas/canvas.js',
        './game-of-life/',
        './game-of-life/index.html',
        './game-of-life/src/index.js',
        './game-of-life/src/gameOfLife.js',
        './game-of-life/src/stylesheets/main.css',
        './minesweeper/',
        './minesweeper/index.html',
        './minesweeper/src/index.js',
        './minesweeper/src/assets/flag.svg',
        './minesweeper/src/assets/bomb.svg',
        './minesweeper/src/minesweeper.js',
        './minesweeper/src/stylesheets/main.css',
      ]);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keyList) => {
    Promise.all(keyList.map((key) => {
      if (key.endsWith(cacheVersion)) {
        caches.delete(key);
      }
    }))
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => {
        return response || fetch(event.request);
      })
  );
});