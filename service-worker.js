'use strict';

const CACHE_ESTATICO = "wikicerva_estatico";

const ARQUIVOS_ESTATICO = [

    'css/bootstrap.min.css',
    'css/styles.css',
    'images/bg001.jpg',
    'images/bg002.jpg',
    'images/bg003.jpg',
    'images/foto2.jpg',
    'images/logo.png',
    'images/whatsapp-icon.png',
    'images/offline.png',    
    'js/bootstrap.bundle.min.js',
    'js/app.js',    
    'offline_001.html'
];

self.addEventListener('install', (evt) => {

    evt.waitUntil(

        caches.open(CACHE_ESTATICO).then((cache) => {

            return cache.addAll(ARQUIVOS_ESTATICO);

        })

    );

    self.skipWaiting();

});

self.addEventListener('activate', (evt) => {

    evt.waitUntil(

        caches.keys().then((keylist) => {

            return Promise.all(keylist.map((key) => {

                if(key !== CACHE_ESTATICO){
                    return caches.delete(key);
                }

            }));
        })

    );

    self.clients.claim();

});

/*
Responder a experiencia offline
*/

self.addEventListener('fetch', (evt) => {

    if(evt.request.mode !== 'navigate'){
        return;
    }

    evt.respondWith(

        fetch(evt.request).catch(()=>{

            return caches.open(CACHE_ESTATICO).then((cache) => {

                return cache.match('offline_001.html');

            });

        })

    );

});