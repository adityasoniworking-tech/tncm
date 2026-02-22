const CACHE_NAME = 'nutty-bakery-v1.2.0';
const ASSETS = [
  '/',
  '/index.html',
  '/Pages/about.html',
  '/Pages/contact.html',
  '/Pages/menu.html',
  '/Pages/tracking.html',
  '/Pages/whatsapp_select.html',
  '/Pages/offline.html',
  '/CSS/style.css?v=1.2.0',
  '/CSS/modals.css?v=1.2.0',
  '/JS/script.js?v=1.2.0',
  '/JS/layout.js?v=1.2.0',
  '/JS/delivery-map.js?v=1.2.0',
  '/JS/modal-handler.js?v=1.2.0',
  '/JS/modal-injector.js?v=1.2.0',
  '/JS/bill.js?v=1.2.0',
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
});

// App install hone par files cache karein
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch(error => {
        console.log('Cache addAll error:', error);
        // Missing files ko skip karke continue karein
        return Promise.resolve();
      });
    })
  );
});

// Always try network first, then cache
self.addEventListener('fetch', (event) => {
  // Skip non-http requests (extensions, etc.)
  // Skip non-http requests (extensions, etc.)
  if (!event.request.url.startsWith('http')) {
    return;
  }

  // Skip POST requests and other non-GET methods
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Skip cache for CSS and JS files with version params
  if (event.request.url.includes('?v=')) {
    return;
  }
  
  event.respondWith(
    fetch(event.request).then((response) => {
      // Check if we received a valid response
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }

      // Clone the response
      const responseToCache = response.clone();

      caches.open(CACHE_NAME)
        .then((cache) => {
          // Ensure request is http/https before putting in cache
          if (event.request.url.startsWith('http')) {
             cache.put(event.request, responseToCache);
          }
        });

      return response;
    }).catch(() => {
      // Try cache if network fails
      return caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        
        // For HTML requests, serve offline page
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/Pages/offline.html');
        }
        
        // For other requests, return offline response
        return new Response('Offline - Please check your internet connection', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      });
    })
  );
});