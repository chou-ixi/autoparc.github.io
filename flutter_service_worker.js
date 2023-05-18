'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "95041bc90686dddf16c2f0c223b36d24",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"manifest.json": "5696db8d701b1f3dd758027f7ff7db0c",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"main.dart.js": "8bebaf05331a90ce9c2e99fcdbf78f46",
"index.html": "0e89ff851b76efe8a43a4d343b1250f1",
"/": "149178840dfc10cabab41fdf47d7c868",
"myautoparc_web/version.json": "95041bc90686dddf16c2f0c223b36d24",
"myautoparc_web/flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"myautoparc_web/manifest.json": "5696db8d701b1f3dd758027f7ff7db0c",
"myautoparc_web/favicon.png": "5dcef449791fa27946b3d35ad8803796",
"myautoparc_web/main.dart.js": "00a467ad40c087645ec5083cdfd3b5b2",
"myautoparc_web/index.html": "149178840dfc10cabab41fdf47d7c868",
"myautoparc_web/assets/NOTICES": "8aef286f5ab9d4506b744eeeb7337b02",
"myautoparc_web/assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"myautoparc_web/assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"myautoparc_web/assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"myautoparc_web/assets/assets/playStore.png": "99afa96c0af194adbff67dfc77e43d30",
"myautoparc_web/assets/assets/myautoLoading.gif": "ebb1da553402f8dbcc732eeaade0abcd",
"myautoparc_web/assets/assets/app-Store.png": "e5dabd0f98e697c689d47b94e555d3fd",
"myautoparc_web/assets/AssetManifest.json": "bc2b77024eba63418f90733c68dac68e",
"myautoparc_web/canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"myautoparc_web/canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"myautoparc_web/canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"myautoparc_web/canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"myautoparc_web/icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"myautoparc_web/icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"myautoparc_web/icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"myautoparc_web/icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"assets/NOTICES": "6fcbfd7928a31b49908bddbda5ccce95",
"assets/AssetManifest.smcbin": "14b57ef09f001b604a2cc06e23fc09a2",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/fonts/MaterialIcons-Regular.otf": "5ddb2acb7bba3e30bdc6ca15a86dd98c",
"assets/assets/playStore.png": "99afa96c0af194adbff67dfc77e43d30",
"assets/assets/myautoLoading.gif": "ebb1da553402f8dbcc732eeaade0abcd",
"assets/assets/app-Store.png": "e5dabd0f98e697c689d47b94e555d3fd",
"assets/AssetManifest.json": "bc2b77024eba63418f90733c68dac68e",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "45bec3a754fba62b2d8f23c38895f029",
"canvaskit/skwasm.wasm": "f8ad032402ea275e8ab8089319009a02",
"canvaskit/skwasm.js": "9265c6c0cdc6b28cff3e81701d8fd707",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"canvaskit/chromium/canvaskit.js": "6bdd0526762a124b0745c05281c8a53e",
"canvaskit/chromium/canvaskit.wasm": "3a50c4159759442f9a8a2668ea457f8b",
"canvaskit/canvaskit.wasm": "f79f9d81972629f25ee7eedc00ab76d4",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
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
        // Claim client to enable caching on first launch
        self.clients.claim();
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
      // Claim client to enable caching on first launch
      self.clients.claim();
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
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
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
