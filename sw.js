var cacheName='myCahs';
var filesTocash=[
    '/',
    '/app.js',
    '/styles.css'
];

self.addEventListener('install', function(e){
    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            return cache.addAll(filesTocash)
        })
    )
});

self.addEventListener('fetch', function(e){
    const req=e.request;
    const url= new URL(req.url);
    if(url.origin==location.origin)
    e.respondWith(cacheFirst(req));
    else{
        e.respondWith(networkFirst(req));
    }
});

async function cacheFirst(req){
    const cashResponse=await caches.match(req);
    return cashResponse || fetch(req);
}

async function networkFirst(req){
    const cache=await caches.open('news-dynamic');
    try{
        const res=await fetch(req);
        cache.put(req,res.clone());
        return res;
    }
    catch{
        return await cache.match(req);
    }
}