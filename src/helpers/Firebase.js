import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyBXiPeQrHKzf4U-53hRPh5l_kxML5pe4ks',
  authDomain: 'ifa-lms-app.firebaseapp.com',
  projectId: 'ifa-lms-app',
  storageBucket: 'ifa-lms-app.appspot.com',
  messagingSenderId: '899898823065',
  appId: '1:899898823065:web:6ddfba068ea413a5e4c308',
  measurementId: 'G-8CLWG97Y0H',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

let messaging = null

if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging()

  messaging.usePublicVapidKey(
    'BGTeg8qkoN8RE9JgMpQ14gpqoGELKsHWKHP58kxmLxogGmtNUP27Ow3IBWHiXQFY3KmtEbOFAohIcD0MWclNcQ0'
  )
}

const getNewToken = () => {
  if (firebase.messaging.isSupported()) {
    messaging
      .requestPermission()
      .then(function () {
        console.log('Notification permission granted.')
        messaging
          .getToken()
          .then((currentToken) => {
            if (currentToken) {
              console.log('token', currentToken)
              axios.post('users/update-fcm/' + currentToken).then((res) => {
                if (res.data.status === 200) {
                  localStorage.setItem('@fcm', currentToken)
                  console.log('FCM submitted')
                }
              })
            } else {
              console.log(
                'No Instance ID token available. Request permission to generate one.'
              )
            }
          })
          .catch((err) => {
            console.log('An error occurred while retrieving token. ', err)
          })
      })
      .catch(function (err) {
        console.log('Unable to get permission to notify. ', err)
      })
  }
}

export { messaging, getNewToken }
