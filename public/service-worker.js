const CACHE_NAME = 'my-cache';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                '/',
                '/manifest.json',
                '/icon.png',
                '/arrow-left.svg',
                '/bell.svg',
                '/lapin.svg',
                '/plus.png',
                '/plus-circle.svg',
                '/Snappies-Logo.png',
                '/snappiesPieds.png',
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
