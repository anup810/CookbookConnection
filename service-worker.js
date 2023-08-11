// Define the cache name and assets to cache
const CACHE_NAME = 'cookbook-app-cache';
const CACHE_URLS = [
    '/',
    '/index.html',
    '/pages/about.html',
    '/pages/login.html',
    '/pages/register.html',
    '/pages/recipe.html',
    '/styles/about.css',
    '/styles/form.css',
    '/styles/login.css',
    '/styles/main.css',
    '/styles/navigation.css',
    '/styles/recipe.css',
    '/styles/register.css',
    '/js/cookbook-db/cookbook-db.js',
    '/js/about.js',
    '/js/login_register.js',
    '/js/login.js',
    '/js/recipe.js',
    '/js/register.js',
    '/js/script.js',


];

// Install event: cache the static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(CACHE_URLS);
            })
    );
});

// Fetch event: serve cached assets or fetch from network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
