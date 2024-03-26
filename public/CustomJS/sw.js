var cacheName = 'hello-pwa';

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      cache.addAll([
        '/js/Jquery.js',
        '/js/Bootstrap.js',
        '/CustomJS/Landing.js',
        '/CustomJS/Auth.js',
        '/CustomJS/Custom.js'
      ])
    })
  );
});

self.addEventListener('fetch', function(e){
  e.respondWith(caches.match(e.request).then((response) =>{
    if(response)
    return response;
  }))
});


