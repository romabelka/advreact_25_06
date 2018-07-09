import { initializeApp } from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export const appName = 'adv-react-au-0307'

const config = {
  apiKey: 'AIzaSyDj6YDOCSRPFbUGtUwwtyPrA-koT2uKCxg',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: '',
  messagingSenderId: '650330669903'
}

initializeApp(config)
