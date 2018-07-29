import { initializeApp } from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export const appName = 'advreact-25-06-c6bae'

const config = {
  apiKey: 'AIzaSyBM5eZETRfWWS9BoQ-8guawlYzeW7dDToE',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: '',
  messagingSenderId: '985221034928'
}

initializeApp(config)
