//static assets

const staticAssets = [
    './',
    './main.js',
    './main.css',
    './images/left-side-blue.jpg'
];

self.addEventListener('install', async event => {
    
    const cache = await caches.open('article-static');

    cache.addAll(staticAssets); 
})

self.addEventListener('fetch', event => {

    const request = event.request;

    const url = new URL(request.url);
    if( url.origin === location.origin ) {
        event.respondWith(cacheFirst(request));
    } else {
        event.respondWith(networkFirst(request));
    }
    
})

async function cacheFirst(request) {

    const cacheResponse = await caches.match(request);

    return cacheResponse || fetch(request);
}

async function networkFirst(request) {

    const cache = await caches.open('article-dynamic');

    try {

        const res = await fetch(request);

        cache.put(request, res.clone());

        return res;
    } catch (error) {
        
        return await caches.match(request);
    }
}