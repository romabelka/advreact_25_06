import {observable, action} from 'mobx'
import firebase from 'firebase/app'
import BasicStore from './basic-store'

class AuthStore extends BasicStore {
    @observable email = ''
    @observable password = ''
    @observable user = null

    constructor(...args) {
        super(...args)
        firebase.auth().onAuthStateChanged(this.setUser)
    }

    @action setUser = (user) => this.user = user

    @action setEmail = email => this.email = email
    @action setPassword = password => this.password = password

    signIn = () => {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    }


}

export default AuthStore