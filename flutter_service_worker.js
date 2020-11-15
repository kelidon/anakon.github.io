'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "074cb9a88f6f6baa87849244738da692",
"assets/assets/fonts/anakonGreek.ttf": "430f34af3cee1597029517c3663f6f83",
"assets/assets/fonts/Poppins-Bold.ttf": "a3e0b5f427803a187c1b62c5919196aa",
"assets/assets/fonts/Poppins-Regular.ttf": "8b6af8e5e8324edfd77af8b3b35d7f9c",
"assets/assets/images/blur.jpg": "0f0fb1dcf3f4538ad0eeaac25733e872",
"assets/assets/images/blur_for_bs.jpg": "6e1b9d1f220da8f0d0c3c1a94b999fe2",
"assets/assets/images/blur_horizontal.png": "89914aac41995f810d5c82e4dde0767f",
"assets/assets/images/effective.jpg": "b817a80a7a3b766b1727ac60938d6c50",
"assets/assets/images/experience.jpg": "1a9eefe747d8f7464d42314f0398cdbe",
"assets/assets/images/individuality.jpg": "72cc8dec8d819f78498b1b278edbffea",
"assets/assets/images/logo_appbar.png": "165a323b81f8974d5a2393037fa23ec4",
"assets/assets/images/logo_appbar_1.png": "a20feca92415fc2d3aa452d6e7987a1a",
"assets/assets/images/logo_menu.png": "95dbd78ebb7da3f2195ef45e1944808e",
"assets/assets/images/logo_on_tower.png": "aa88effa9830c900f478c15cde1ea4ca",
"assets/assets/images/new_blur_1.jpg": "4cdb322730b8f9b0ce7dd20c49b9ebf4",
"assets/assets/images/new_blur_1_blur.jpg": "1a54fe0b7a6dea496bb497246f151407",
"assets/assets/images/new_blur_2.jpg": "5b1b3f1f3a67c996972a799d20dce79a",
"assets/assets/images/new_blur_2_blur.jpg": "58cdfad4e10125e0824ba8f1cb402590",
"assets/assets/images/new_blur_3.jpg": "0257ba99b83c07eee34984faa1cf225c",
"assets/assets/images/new_blur_3_blur.jpg": "f3887d041176dc1b606fb479ab8bea28",
"assets/assets/images/online_support.jpg": "15ea9631364ccf6e7f22b70aa721080c",
"assets/assets/images/outstaffing.jpg": "bfe93be6708da044ca14b7cc464e676a",
"assets/assets/images/personal_engineer.jpg": "f779efdc276fb3e256fb4c561e95e900",
"assets/assets/images/unique.jpg": "7d6a1fad78e2303e4f5110a93194d3ea",
"assets/assets/video/tower.mp4": "0843a0436a6f812ba8b4be6db33a61b8",
"assets/assets/video/tower1.mp4": "4fc21f5d7107193fbe6a7f0e174b8657",
"assets/assets/video/tower_horizontal.gif": "715ac019f9098be4c11ebe8be448c417",
"assets/assets/video/tower_horizontal.mp4": "614361398e93291bf4c45d732186473b",
"assets/FontManifest.json": "b13624a073351eb36193dcbd22db1cee",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/NOTICES": "ba7417d0015fdd09cce937c928ddc677",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "b14fcf3ee94e3ace300b192e9e7c8c5d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "5a37ae808cf9f652198acde612b5328d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "2bca5ec802e40d3f4b60343e346cedde",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "2aa350bd2aeab88b601a593f793734c0",
"icons/favicon.png": "80ac74e893ec13f5b78c9386ef3044e6",
"icons/favicon1.png": "fe279c7cb25106ec0d4f139f0594fc1a",
"icons/favicon2.png": "340aacff202dab195093452009e04e09",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "12a02400ee034e687fd553bd483ce6ec",
"/": "12a02400ee034e687fd553bd483ce6ec",
"main.dart.js": "05ef637916ac62b009dade78dc4aa540",
"manifest.json": "edec10d4a54b61be5dd08497f4fc29dd",
"version.json": "01c1abd99ff96808711d37ec4b2d72f0"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
