importScripts('./ngsw-worker.js');

(function () {
    'use strict';

    var that = this;

    self.addEventListener('notificationclick', (event) => {
        console.log("This is custom service worker notificationclick method.");
        console.log('Notification details: ', event.notification);
        // Write the code to open
        if (clients.openWindow && event.data.url) {
            event.waitUntil(clients.openWindow(event.notification.data.url));

            // clickAckUrl
            if (event.data.clickAckUrl) {
                const body = { title: 'Angular PUT Request Example' };
                that.http.put < any > (event.notification.data.clickAckUrl, body).subscribe();
            }
        }
    });
    self.addEventListener('push', function (event) {
        console.log('[Service Worker] Push Received.');
        console.log(event.data);
        // const title = 'Push Codelab';
        // const options = {
        //   body: 'Yay it works.',
        //   icon: 'images/icon.png',
        //   badge: 'images/badge.png'
        // };

        if (event.data.openAckUrl){
            const body = { title: 'Angular PUT Request Example' };
            that.http.put < any > (event.notification.data.openAckUrl, body).subscribe();
        }
            // event.waitUntil(clients.openWindow(event.notification.data.openAckUrl));
    });

}


    ());