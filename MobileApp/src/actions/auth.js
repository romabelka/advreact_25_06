import firebase from 'firebase/app'
import stores from '../stores'

export const LoggedIn = (email, password) => {
  const firebaseAuth = firebase.auth()
  const { auth } = stores
  return firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(({user})=> auth.setUser(user))
    .catch((e) => console.error(e))
}


