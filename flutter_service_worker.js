'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "62476bb4197eaa19d94840985d5a5a5e",
"assets/assets/fonts/anakonGreek.ttf": "430f34af3cee1597029517c3663f6f83",
"assets/assets/fonts/Poppins-Bold.ttf": "a3e0b5f427803a187c1b62c5919196aa",
"assets/assets/fonts/Poppins-Regular.ttf": "8b6af8e5e8324edfd77af8b3b35d7f9c",
"assets/FontManifest.json": "b13624a073351eb36193dcbd22db1cee",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/images/blur.jpg": "0f0fb1dcf3f4538ad0eeaac25733e872",
"assets/images/blur_for_bs.jpg": "6e1b9d1f220da8f0d0c3c1a94b999fe2",
"assets/images/blur_horizontal.png": "89914aac41995f810d5c82e4dde0767f",
"assets/images/effective.jpg": "b817a80a7a3b766b1727ac60938d6c50",
"assets/images/experience.jpg": "1a9eefe747d8f7464d42314f0398cdbe",
"assets/images/individuality.jpg": "72cc8dec8d819f78498b1b278edbffea",
"assets/images/logo_appbar.png": "165a323b81f8974d5a2393037fa23ec4",
"assets/images/logo_appbar_1.png": "a20feca92415fc2d3aa452d6e7987a1a",
"assets/images/logo_menu.png": "95dbd78ebb7da3f2195ef45e1944808e",
"assets/images/logo_on_tower.png": "aa88effa9830c900f478c15cde1ea4ca",
"assets/images/null.png": "428d32c8089fda01e2f63b072cb9038c",
"assets/images/online_support.jpg": "15ea9631364ccf6e7f22b70aa721080c",
"assets/images/outstaffing.jpg": "bfe93be6708da044ca14b7cc464e676a",
"assets/images/personal_engineer.jpg": "f779efdc276fb3e256fb4c561e95e900",
"assets/images/right_stripe_hover.png": "451fc1b0733038810a78fdd888283e06",
"assets/images/unique.jpg": "7d6a1fad78e2303e4f5110a93194d3ea",
"assets/NOTICES": "a009800701f5155a9b77350a2ab39ed7",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "b14fcf3ee94e3ace300b192e9e7c8c5d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "5a37ae808cf9f652198acde612b5328d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "2bca5ec802e40d3f4b60343e346cedde",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "2aa350bd2aeab88b601a593f793734c0",
"assets/web/assets/images/blur.jpg": "0f0fb1dcf3f4538ad0eeaac25733e872",
"assets/web/assets/images/blur_for_bs.jpg": "6e1b9d1f220da8f0d0c3c1a94b999fe2",
"assets/web/assets/images/blur_horizontal.png": "89914aac41995f810d5c82e4dde0767f",
"assets/web/assets/images/effective.jpg": "b817a80a7a3b766b1727ac60938d6c50",
"assets/web/assets/images/experience.jpg": "1a9eefe747d8f7464d42314f0398cdbe",
"assets/web/assets/images/individuality.jpg": "72cc8dec8d819f78498b1b278edbffea",
"assets/web/assets/images/logo_appbar.png": "165a323b81f8974d5a2393037fa23ec4",
"assets/web/assets/images/logo_appbar_1.png": "a20feca92415fc2d3aa452d6e7987a1a",
"assets/web/assets/images/logo_menu.png": "95dbd78ebb7da3f2195ef45e1944808e",
"assets/web/assets/images/logo_on_tower.png": "aa88effa9830c900f478c15cde1ea4ca",
"assets/web/assets/images/null.png": "428d32c8089fda01e2f63b072cb9038c",
"assets/web/assets/images/online_support.jpg": "15ea9631364ccf6e7f22b70aa721080c",
"assets/web/assets/images/outstaffing.jpg": "bfe93be6708da044ca14b7cc464e676a",
"assets/web/assets/images/personal_engineer.jpg": "f779efdc276fb3e256fb4c561e95e900",
"assets/web/assets/images/right_stripe_hover.png": "451fc1b0733038810a78fdd888283e06",
"assets/web/assets/images/unique.jpg": "7d6a1fad78e2303e4f5110a93194d3ea",
"fonts/Poppins-Bold.ttf": "a3e0b5f427803a187c1b62c5919196aa",
"fonts/Poppins.ttf": "8b6af8e5e8324edfd77af8b3b35d7f9c",
"icons/favicon.png": "352d4263a55bb77aa76418f5a0964328",
"index.html": "c346a8a6a5a122f10abcfc64174446a3",
"/": "c346a8a6a5a122f10abcfc64174446a3",
"index.template.html": "c38f3bfd3d2e12771ccf8ffec882dd35",
"main.dart.js": "314149ce5594ba14b67f34a012abfeb9",
"manifest.json": "e5a408087146d5e03de2f2b05a4f5e9b",
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
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
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
  for (var resourceKey of Object.keys(RESOURCES)) {
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
