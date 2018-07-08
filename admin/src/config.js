import { initializeApp } from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export const appName = 'advreact2506'

const config = {
  apiKey: 'AIzaSyASXmuELKMXGJMQYvkdcuVCsYRTpzjED8U',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: '',
  messagingSenderId: '983731384962'
}

initializeApp(config)
