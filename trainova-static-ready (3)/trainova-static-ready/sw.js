// ============================================================
// Trainova v10.2 — Smart Kill Switch Service Worker
// این SW هوشمند:
//   1. همیشه اول چک می‌کنه اینترنت هست یا نه
//   2. اگه اینترنت بود → تمام کش‌ها و SWهای قدیمی رو پاک می‌کنه
//   3. نسخه جدید رو از سرور می‌گیره (offline اجرا نمی‌شه)
//   4. فقط اگه اینترنت نبود → از کش استفاده می‌کنه
// ============================================================

const TAG = "[Trainova SW v10.2-smart]";
const VERSION = "10.2";
const CLEANED_KEY = "trainova_sw_killed_v10_2";

// لیست تمام کش‌های قدیمی که باید پاک بشن
const OLD_CACHE_PATTERNS = [
  "trainova",
  "next-cache",
  "workbox",
  "static-assets",
  "dynamic-assets"
];

self.addEventListener("install", (event) => {
  console.log(TAG, "install — skip waiting & activate immediately");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  console.log(TAG, "activate — starting smart cleanup");
  event.waitUntil(
    (async () => {
      try {
        // 1. Clear ALL caches (old and new)
        const keys = await caches.keys();
        console.log(TAG, "found caches:", keys);
        
        for (const key of keys) {
          await caches.delete(key);
          console.log(TAG, "deleted cache:", key);
        }
        
        // 2. Claim all clients
        await clients.claim();
        
        // 3. Tell all clients to reload from network
        const clientList = await clients.matchAll({ type: "window", includeUncontrolled: true });
        for (const client of clientList) {
          try {
            client.postMessage({ 
              type: "TRAINOVA_FORCE_RELOAD", 
              source: "kill-switch-v10.2",
              message: "نسخه جدید در حال بارگذاری است..."
            });
          } catch (e) {
            console.warn(TAG, "failed to postMessage to client", e);
          }
        }
        
        // 4. Unregister THIS service worker after cleanup
        setTimeout(async () => {
          await self.registration.unregister();
          console.log(TAG, "self-unregistered ✓");
        }, 1000);
        
      } catch (e) {
        console.error(TAG, "cleanup failed", e);
      }
    })()
  );
});

// Fetch handler: SMART — Network First, Cache Only If Offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      try {
        // Check if online
        if (navigator.onLine !== false) {
          // Try to fetch from network
          const networkResponse = await fetch(event.request, {
            cache: "no-cache",
            mode: event.request.mode,
            credentials: event.request.credentials,
            redirect: "follow"
          });
          
          // If successful, return network response (don't cache)
          if (networkResponse.ok) {
            console.log(TAG, "network:", event.request.url);
            return networkResponse.clone();
          }
        }
        
        // If offline or network failed, try cache
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          console.log(TAG, "cache:", event.request.url);
          return cachedResponse;
        }
        
        // If nothing works, return offline page
        return new Response("آفلاین هستید و این صفحه در کش موجود نیست.", {
          status: 503,
          headers: { "Content-Type": "text/html; charset=utf-8" }
        });
        
      } catch (error) {
        // Network error — try cache as fallback
        console.warn(TAG, "fetch error, trying cache:", error.message);
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return new Response("خطای شبکه — آفلاین هستید", {
          status: 503,
          headers: { "Content-Type": "text/plain; charset=utf-8" }
        });
      }
    })()
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
  if (event.data && event.data.type === "FORCE_CLEANUP") {
    console.log(TAG, "received FORCE_CLEANUP command");
    self.registration.unregister();
  }
});

console.log(TAG, "loaded — ready to force update");
