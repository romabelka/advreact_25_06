import { initializeApp } from 'firebase/app'
import 'firebase/auth'

export const appName = 'adv-react-25-06'

const config = {
  apiKey: 'AIzaSyD25TAZjq0-smHue8ViLsxv3nWBHm3Pjug',
  authDomain: 'advreact-bed03.firebaseapp.com',
  databaseURL: 'https://advreact-bed03.firebaseio.com',
  projectId: 'advreact-bed03',
  storageBucket: '',
  messagingSenderId: '389238619888'
}

initializeApp(config)
