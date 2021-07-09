importScripts("https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/7.23.0/firebase-messaging.js")

const firebaseConfig = {
    apiKey: "AIzaSyBXiPeQrHKzf4U-53hRPh5l_kxML5pe4ks",
    authDomain: "ifa-lms-app.firebaseapp.com",
    projectId: "ifa-lms-app",
    storageBucket: "ifa-lms-app.appspot.com",
    messagingSenderId: "899898823065",
    appId: "1:899898823065:web:6ddfba068ea413a5e4c308",
    measurementId: "G-8CLWG97Y0H"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.usePublicVapidKey(
    "BGTeg8qkoN8RE9JgMpQ14gpqoGELKsHWKHP58kxmLxogGmtNUP27Ow3IBWHiXQFY3KmtEbOFAohIcD0MWclNcQ0"
)
messaging.setBackgroundMessageHandler(function (payload) {
    var notificationTitle = payload.notification.title
    var notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
    }
    console.log(payload)
    return messaging.registration.showNotification(
        notificationTitle,
        notificationOptions
    )
})