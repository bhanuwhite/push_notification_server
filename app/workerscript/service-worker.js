self.addEventListener('push', function (event) {
    var payload = event.data ? event.data.text() : 'no payload';

    event.waitUntil(
            self.registration.showNotification('Notify Message', {
                body: payload,
                icon: 'push.png',
                requireInteraction: true
            })
            );
});