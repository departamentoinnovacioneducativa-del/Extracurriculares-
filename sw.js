const CACHE_NAME = 'org-extra-v1.0'; 
const urlsToCache = ['./', './index.html', './styles.css', './script.js', './manifest.json'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)).then(() => self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(cacheNames => { return Promise.all(cacheNames.map(cacheName => { if (cacheName !== CACHE_NAME) return caches.delete(cacheName); })); }).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => { if (event.request.method !== 'GET') return; event.respondWith(fetch(event.request).then(response => { if (response && response.status === 200 && response.type === 'basic') { const responseToCache = response.clone(); caches.open(CACHE_NAME).then(cache => { cache.put(event.request, responseToCache); }); } return response; }).catch(() => caches.match(event.request))); });
