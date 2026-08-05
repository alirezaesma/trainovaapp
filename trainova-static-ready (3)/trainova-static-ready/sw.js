// ============================================================
// Trainova v10 — Kill Switch Service Worker
// این SW جایگزین SW قدیمی v9 می‌شه و:
//   1. تمام کش‌ها رو پاک می‌کنه
//   2. خودش رو unregister می‌کنه
//   3. پیام به کلاینت‌ها می‌فرسته که reload کنن
// این SW هیچ‌چیزی رو کش نمی‌کنه
// ============================================================

const TAG = "[Trainova SW v10-kill]";

self.addEventListener("install", (event) => {
  console.log(TAG, "install — skip waiting");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  console.log(TAG, "activate — clearing caches + unregistering self");
  event.waitUntil(
    (async () => {
      try {
        // 1. Clear ALL caches
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
        console.log(TAG, "cleared", keys.length, "caches");

        // 2. Claim all clients
        await clients.claim();

        // 3. Tell all clients to reload (postMessage, not navigate to avoid loops)
        const clientList = await clients.matchAll({ type: "window", includeUncontrolled: true });
        for (const client of clientList) {
          try {
            client.postMessage({ type: "TRAINOVA_SW_CLEANED", source: "kill-switch" });
          } catch (e) {}
        }

        // 4. Unregister THIS service worker
        await self.registration.unregister();
        console.log(TAG, "self-unregistered ✓");
      } catch (e) {
        console.error(TAG, "cleanup failed", e);
      }
    })()
  );
});

// Fetch handler: pass-through to network, never cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response("Offline", {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    })
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

console.log(TAG, "loaded");
