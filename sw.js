const CACHE='ibbes-v8.2.2';
const CORE=['./','./index.html','./manifest.webmanifest','./logo-photo.jpg','./icon-192.png','./icon-512.png'];
const MEDIA=["./bg-libya-coast-01.jpg", "./bg-libya-coast-02.jpg", "./bg-libya-heritage-01.jpg", "./bg-libya-heritage-02.jpg", "./bg-libya-heritage-03.jpg", "./bg-morocco-01.jpg", "./bg-morocco-02.jpg", "./bg-morocco-03.jpg", "./bg-morocco-04.jpg", "./bg-neutral-01.jpg", "./bg-neutral-02.jpg", "./bg-neutral-03.jpg", "./bg-sweden-01.jpg", "./bg-sweden-02.jpg", "./bg-sweden-03.jpg", "./icon-192.png", "./icon-512.png", "./logo-photo.jpg", "./visual-112.png", "./visual-2fa.png", "./visual-ai.png", "./visual-argument.png", "./visual-atom.png", "./visual-backup.png", "./visual-baltic.png", "./visual-bankid.png", "./visual-bias.png", "./visual-budget.png", "./visual-climate.png", "./visual-coldwar.png", "./visual-compound.png", "./visual-constitution.png", "./visual-consumer.png", "./visual-context.png", "./visual-contract.png", "./visual-correlation.png", "./visual-deadline.png", "./visual-debt.png", "./visual-democracy.png", "./visual-dna.png", "./visual-enlightenment.png", "./visual-eu.png", "./visual-frenchrev.png", "./visual-gdp.png", "./visual-gv.png", "./visual-hijra.png", "./visual-industry.png", "./visual-inflation.png", "./visual-interest.png", "./visual-islam.png", "./visual-mena.png", "./visual-municipal.png", "./visual-nato.png", "./visual-nextstep.png", "./visual-northafrica.png", "./visual-phishing.png", "./visual-prayer.png", "./visual-probability.png", "./visual-public.png", "./visual-qibla.png", "./visual-quran.png", "./visual-rabat.png", "./visual-ramadan.png", "./visual-renaissance.png", "./visual-rome.png", "./visual-rulelaw.png", "./visual-source.png", "./visual-stormakt.png", "./visual-swedenmap.png", "./visual-tawhid.png", "./visual-tax.png", "./visual-tripoli.png", "./visual-un.png", "./visual-vaccine.png", "./visual-vote.png", "./visual-work.png", "./visual-worldmap.png", "./visual-wudu.png", "./visual-ww1.png", "./visual-ww2.png", "./visual-zakat.png"];
self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    await cache.addAll(CORE);
    await Promise.allSettled(MEDIA.map(async u=>{try{const r=await fetch(u,{cache:'no-store'});if(r.ok)await cache.put(u,r)}catch{}}));
  })());
});
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  for(const key of await caches.keys())if(key!==CACHE)await caches.delete(key);
  await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
  const req=event.request;if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(req.mode==='navigate'){
    event.respondWith((async()=>{
      try{const fresh=await fetch(req,{cache:'no-store'});const c=await caches.open(CACHE);c.put('./index.html',fresh.clone());return fresh}
      catch{return (await caches.match('./index.html'))||Response.error()}
    })());return;
  }
  if(url.origin===self.location.origin){
    event.respondWith((async()=>{
      const cached=await caches.match(req);
      const fresh=fetch(req).then(async r=>{if(r.ok){const c=await caches.open(CACHE);c.put(req,r.clone())}return r}).catch(()=>null);
      return cached||(await fresh)||Response.error();
    })());
  }
});
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil((async()=>{const ws=await clients.matchAll({type:'window',includeUncontrolled:true});if(ws[0])return ws[0].focus();return clients.openWindow('./?page=today')})())});
