import { initializeApp } from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export const appName = 'adv-react-25-06'

const config = {
  apiKey: 'AIzaSyDzqwnZ_39QyqhxYZVPjVH8eBww7DUBmVc',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: '',
  messagingSenderId: '874599443389'
}

initializeApp(config)
