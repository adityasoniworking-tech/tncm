const CACHE_NAME = 'nutty-bakery-v1.0.16';
const ASSETS = [
  '/',
  '/index.html',
  '/about',
  '/contact',
  '/menu',
  '/tracking',
  '/whatsapp',
  '/offline',
  '/CSS/style.css?v=1.0.15',
  '/CSS/modals.css?v=1.0.15',
  '/JS/script.js?v=1.0.15',
  '/JS/layout.js?v=1.0.15',
  '/JS/delivery-map.js?v=1.0.15',
  '/JS/modal-handler.js?v=1.0.15',
  '/JS/modal-injector.js?v=1.0.15',
  '/JS/bill.js?v=1.0.15',
  '/assets/images/logo-mobile.svg',
  '/assets/images/logo192.png',
  '/assets/icons/favicon.ico',
  '/assets/images/mihir.jpg',
  '/assets/images/shrikant.jpg',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@400;500&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Clear old cache on activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Install and cache assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch(error => {
        console.log('Cache addAll error:', error);
        return Promise.resolve();
      });
    })
  );
});

// Fetch Strategy
self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith('http')) return;
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isStaticAsset = /\.(js|css|png|jpg|jpeg|svg|woff|woff2|ttf|ico)$/i.test(url.pathname) || 
                        event.request.destination === 'script' ||
                        event.request.destination === 'style' ||
                        event.request.destination === 'image' ||
                        event.request.destination === 'font';
  
  // Strategy: Stale-While-Revalidate for Static Assets
  if (isStaticAsset) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
           // Ensure we only cache successful responses from our own origin or known safe CDNs if CORS allows
           if (networkResponse && networkResponse.status === 200 && (networkResponse.type === 'basic' || networkResponse.type === 'cors')) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
           }
           return networkResponse;
        }).catch(() => { return networkResponse; /* Eat errors */ });

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Strategy: Network First for HTML and everything else
  event.respondWith(
    fetch(event.request).then((response) => {
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }
      const responseToCache = response.clone();
      caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, responseToCache);
      });
      return response;
    }).catch(() => {
        return caches.match(event.request).then((response) => {
          if (response) return response;
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/offline.html');
          }
          return new Response('Offline', { status: 503, statusText: 'Offline' });
        });
    })
  );
});
