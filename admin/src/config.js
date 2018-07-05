import { initializeApp } from 'firebase/app'
import 'firebase/auth'

export const appName = 'adv-react-25-06-ff530'

const config = {
  apiKey: 'AIzaSyAMDBrCJU6lXvZeDVzNtOlWWzhqiuJQVS0',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '837192963884'
}

initializeApp(config)
