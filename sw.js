const CACHE='ibbes-v9.0.0';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./logo-photo.jpg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)))});
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(e.request.mode==='navigate'){e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const x=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',x));return r}).catch(()=>caches.match('./index.html')));return}if(u.origin===location.origin&&/\.(?:png|jpg|jpeg|webp|svg|webmanifest)$/i.test(u.pathname)){e.respondWith(caches.match(e.request).then(x=>x||fetch(e.request).then(r=>{if(r.ok)caches.open(CACHE).then(c=>c.put(e.request,r.clone()));return r})));}});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(xs=>xs[0]?xs[0].focus():clients.openWindow('./')))});
