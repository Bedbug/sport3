importScripts('./ngsw-worker.js');

(function () {
    'use strict';

    const sendAck = function(url) {
		return fetch(url, {
			method: 'PUT', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
			  'Content-Type': 'application/json'
			  // 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify({}) // body data type must match "Content-Type" header
		  });
	}
    self.addEventListener('notificationclick', (event) => {
        console.log("This is custom service worker notificationclick method.");
        console.log('Notification details: ', event.notification);
        // Write the code to open
        if (clients.openWindow && event.notification.data.url) {
            //event.waitUntil( Promise.allSettled([ clients.openWindow(event.notification.data.url), sendAck(event.notification.data.clickAckUrl) ]) );
			event.waitUntil( clients.openWindow(event.notification.data.url).then((result) => sendAck(event.notification.data.clickAckUrl)) );
        }
    });

    // self.addEventListener('notificationclick', (event) => {
    //     console.log("This is custom service worker notificationclick method.");
    //     console.log('Notification details: ', event.notification);
    //     // Write the code to open
    //     if (clients.openWindow && event.notification.data.url) {
    //         event.waitUntil(clients.openWindow(event.notification.data.url));

    //         // clickAckUrl
    //         if (event.notification.data.clickAckUrl) {
    //             // const body = { title: 'Angular PUT Request Example' };
    //             // that.http.put < any > (event.notification.data.clickAckUrl, body).subscribe();
    //             const Http = new XMLHttpRequest();
    //             Http.open("PUT", event.notification.data.clickAckUrl);
    //             Http.send();
    //         }
    //     }
    // });
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