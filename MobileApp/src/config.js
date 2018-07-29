import firebase from 'firebase/app'
import 'firebase/auth'

const appName = 'advreact-25-06-c6bae'
const config = {
  apiKey: "AIzaSyBM5eZETRfWWS9BoQ-8guawlYzeW7dDToE",
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: '',
  messagingSenderId: '985221034928'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()

export {
  auth,
}