                                                              const cacheName = "stop-rumpke-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./rumpke3.png",
  "./rumpke.png",
  "https://cdn.tailwindcss.com",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
];

// Install event - cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(urlsToCache).catch((err) => {
        console.log("Cache addAll error:", err);
        // Continue even if some resources fail to cache
        return Promise.resolve();
      });
    }),
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  // Handle only GET requests
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Return cached response if available
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          // Don't cache non-successful responses
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache the new response
          caches.open(cacheName).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
      .catch(() => {
        // Offline fallback - serve index.html for navigation requests
        if (event.request.mode === "navigate") {
          return caches.match("./index.html");
        }
      }),
  );
});
