const CACHE_NAME = 'burung-pro-v1';
const ASSETS_TO_CACHE = [
  './pengingat_burung_master.html',
  './manifest.json'
];

// Phase Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Phase Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Cache Fetching untuk Akses Offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Menangani Pesan Notifikasi Latar Belakang
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIF') {
    self.registration.showNotification(event.data.title, {
      body: event.data.body,
      icon: 'https://cdn-icons-png.flaticon.com/512/3069/3069172.png',
      badge: 'https://cdn-icons-png.flaticon.com/512/3069/3069172.png',
      vibrate: [500, 200, 500, 200, 800],
      tag: 'rawatan-burung-notif'
    });
  }
});