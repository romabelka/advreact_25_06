import {observable, action} from 'mobx'
import firebase from 'firebase/app'
import BasicStore from './basic-store'

class AuthStore extends BasicStore {
    @observable email = ''
    @observable password = ''
    @observable user = null

    @action setEmail = email => this.email = email
    @action setPassword = password => this.password = password

    signIn = () => {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(action(user => {
                this.user = user
                this.getStore('navigation').goTo('lists')
            }))
    }


}

export default AuthStore