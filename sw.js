const CACHE_NAME = 'diary-note-v1';

// যে ফাইলগুলো অফলাইনে ব্যবহারের জন্য সেভ করে রাখতে চান
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192x192.png',
  './icon-512x512.png',
  'https://cdn.jsdelivr.net/npm/chart.js' // Chart.js অফলাইনে পাওয়ার জন্য
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch resources
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // ক্যাশে ফাইল পেলে সেটা রিটার্ন করবে, না পেলে ইন্টারনেট থেকে লোড করবে
      return response || fetch(event.request);
    }).catch(() => {
        // যদি অফলাইনে থাকে এবং ক্যাশও না পায়, তখন এরর হ্যান্ডেল করার জন্য
        console.log('অফলাইন মোড: রিসোর্স পাওয়া যায়নি');
    })
  );
});
