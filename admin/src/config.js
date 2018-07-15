import { initializeApp } from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export const appName = 'adv-react-25-06'

const config = {
  apiKey: 'AIzaSyAYsZJuajlVT1qjHN0t6O4aOgCQ-Rp9-4o',
  authDomain: 'admin-app-e57f9.firebaseapp.com',
  databaseURL: 'https://admin-app-e57f9.firebaseio.com',
  projectId: 'admin-app-e57f9',
  storageBucket: 'admin-app-e57f9.appspot.com',
  messagingSenderId: '517072570954'
}

initializeApp(config)
