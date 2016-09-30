var endpoint, subscriptionObj;

if ('serviceWorker' in navigator) {
    console.log('supported');
    var prompt = false;
//    document.body.innerHTML = document.body.innerHTML + '<input type="button" value="Unsubscribe" onClick="unsubscribeUser()">';
    navigator.serviceWorker.register(serviceworker)
            .then(function (registration) {
                return registration.pushManager.getSubscription()
                        .then(function (subscription) {
                            if (subscription) {
                                subscriptionObj = subscription;
                                registration.pushManager.permissionState({userVisibleOnly: true}).then(function (PushMessagingState) {
                                    console.log(PushMessagingState, 'in if subscription');
                                });
                                return subscription;
                            } else {
                                prompt = true;
                                registration.pushManager.permissionState({userVisibleOnly: true}).then(function (PushMessagingState) {
                                    console.log(PushMessagingState, 'in else');
                                });
                            }
                            return registration.pushManager.subscribe({userVisibleOnly: true}).then(function (e) {
                                console.log('here in catch', e);
                                if (Notification.permission === 'granted') {
                                    console.log('permission granted');
                                    return e;
                                } else if (Notification.permission === 'denied') {
                                    console.log('Permission for Notifications was denied');

                                } else {
                                    console.log('Unable to subscribe to push.', e);
                                }
                            });
                        });
            }).then(function (subscription) {
        console.log('here is subscription', subscription);
        if (subscription) {
            subscriptionObj = subscription;
            var xhttp;
            if (prompt && Notification.permission === 'granted') {
                console.log('here granted and 1st time user visiting site');
                if (window.XMLHttpRequest) {
                    xhttp = new XMLHttpRequest();
                } else {
                    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        //The script to be executed after the response has arrived.
                        console.log('here iin readystatechange');
                    }
                };
                xhttp.open("POST", "/userSubscribeDetails", true);
                xhttp.send();
                //Script For asynchronous execution
                console.log('after send');

            }
            endpoint = subscription.endpoint;
            var rawKey = subscription.getKey ? subscription.getKey('p256dh') : '';
            key = rawKey ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) : '';
            var rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : '';
            authSecret = rawAuthSecret ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) : '';

        } else {
            console.log('else');
        }
    });



} else {
    console.warn('Service workers aren\'t supported in this browser.');
    alert('Service workers aren\'t supported in this browser.');
}