importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

const routing = workbox.routing
const strategies = workbox.strategies

workbox.routing.registerRoute(
    /.(?:css|js|jsx|json)(?:$)/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'assets',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 1000,
                maxAgeSeconds: 31536000,
            }),
        ],
    }),
)

workbox.routing.registerRoute(
    /.(?:png|jpg|jpeg|gif|woff2)$/,
    new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 1000,
                maxAgeSeconds: 31536000,
            }),
        ],
    }),
)

workbox.routing.registerRoute(
    /(\/)$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'startPage',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 1000,
                maxAgeSeconds: 31536000,
            }),
        ],
    }),
)

const CACHE_NAME = 'my-nextjs-pwa-cache-v1'
const urlsToCache = [
    '/', // Cache homepage
    '/manifest.json', // Cache manifest file
    '/favicon.ico', // Cache favicon
    '/web-app-manifest-192x192.png', // Cache 192x192 icon
    '/web-app-manifest-512x512.png', // Cache 512x512 icon
]

// Install Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opened cache')
            return cache.addAll(urlsToCache)
        }),
    )
})

// Intercept fetch requests and serve cached files if available
self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)))
})

// Activate Service Worker and remove old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME]
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName)
                    }
                }),
            ),
        ),
    )
})

self.addEventListener('push', event => {
    const data = event.data ? event.data.json() : {}

    const title = data.title || 'Notification'
    const options = {
        body: data.body,
        icon: data.icon || '/icon.png',
    }

    event.waitUntil(self.registration.showNotification(title, options))
})
