importScripts('./ngsw-worker.js');

(function () {
    'use strict';

    var that = this;

    self.addEventListener('notificationclick', (event) => {
        console.log("This is custom service worker notificationclick method.");
        console.log('Notification details: ', event.notification);
        // Write the code to open
        if (clients.openWindow && event.notification.data.url) {
            event.waitUntil(clients.openWindow(event.notification.data.url));

            // clickAckUrl
            if (event.notification.data.clickAckUrl) {
                // const body = { title: 'Angular PUT Request Example' };
                // that.http.put < any > (event.notification.data.clickAckUrl, body).subscribe();
                const Http = new XMLHttpRequest();
                Http.open("PUT", event.notification.data.clickAckUrl);
                Http.send();
            }
        }
    });
    self.addEventListener('push',  (event) => {
        console.log('[Service Worker] Push Received.');
        console.log(event.notification);
        // const title = 'Push Codelab';
        // const options = {
        //   body: 'Yay it works.',
        //   icon: 'images/icon.png',
        //   badge: 'images/badge.png'
        // };

        if (event.notification.data.openAckUrl){
            // const body = { title: 'Angular PUT Request Example' };
            // that.http.put < any > (event.notification.data.openAckUrl, body).subscribe();
            const Http = new XMLHttpRequest();
                Http.open("PUT", event.notification.data.openAckUrl);
                Http.send();
        }
            // event.waitUntil(clients.openWindow(event.notification.data.openAckUrl));
    });

}


    ());