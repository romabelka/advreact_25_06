import { initializeApp } from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export const appName = 'adv-react-25-06'
const projectId = `${appName}-ikachura`

const config = {
  apiKey: 'AIzaSyDK_BVpTpGjc4C7hQswy7UdZcyBwOhUy60',
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId,
  storageBucket: '',
  messagingSenderId: '266838923267'
}

initializeApp(config)
