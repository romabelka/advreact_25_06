import { initializeApp } from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

export const appName = 'adv-react-25-06'

const config = {
    apiKey: 'AIzaSyDzqwnZ_39QyqhxYZVPjVH8eBww7DUBmVc',
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `gs://${appName}.appspot.com`,
    messagingSenderId: '874599443389'
}

initializeApp(config)
