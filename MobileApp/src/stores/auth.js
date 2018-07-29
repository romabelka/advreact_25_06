import {observable, action, computed} from 'mobx'
import { validate } from 'email-validator'
import firebase from 'firebase'

class AuthStore {
    constructor() {
    }

    @observable email = ''
    @observable password = ''
    @observable user = null

    @computed get isValidEmail() {
        return validate(this.email)
    }

    @action setEmail = email => this.email = email
    @action setPassword = password => this.password = password
    @action setUser = (user) => this.user = user
    
    signIn = () => firebase.auth().signInWithEmailAndPassword(this.email, this.password)
}

export default AuthStore