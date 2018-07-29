import { initializeApp } from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export const appName = 'advreact-25-06'

const config = {
  apiKey: 'AIzaSyBnWMvhTYPpwSnVwYvrWTrsS7TlHwu1wHg',
  authDomain: 'advreact-25-06.firebaseapp.com',
  databaseURL: 'https://advreact-25-06.firebaseio.com',
  projectId: 'advreact-25-06',
  storageBucket: '',
  messagingSenderId: '371151529375'
}


export default () => initializeApp(config)