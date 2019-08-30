# Kagawa AJET - PUSH

This is a small console that can be used to draft and send push notifications to subscribers of the [Kagawa AJET Website](https://kagawa-ajet.herokuapp.com).

## Usage

The script will run with ```npm start``` and then open a browser for authentication.

To stop any malicious intent, only authentication from the official kagawa ajet google account will suffice to push notifications.

## Subscription

To subscribe to the notification list, you can go to the settings on the Web App and enable push notifications.

To subscribe to the dev list, run the following code in the browser console window on the kagawa ajet page:

***ONLY DO THIS IF YOU KNOW WHAT YOU ARE DOING***

```js
navigator.serviceWorker.ready.then(registration => {
  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array('BCDbDny7iDbCpZQ6llBtl9ANwZBTVXD8EgofXbuGAXzp0Ku7NbYbMlR9BJvhj7oOQEUs-uofTQNpnUGDpyWl2FI')
  })
    .then(subscription => {
      fetch('/push/subscribe/dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
      })
    })
})
```