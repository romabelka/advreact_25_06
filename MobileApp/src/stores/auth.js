import {observable, action, computed} from 'mobx'
import { validate } from 'email-validator'

class AuthStore {
    @observable email = ''
    @observable password = ''

    @computed get isValidEmail() {
        return validate(this.email)
    }

    @action setEmail = email => this.email = email
    @action setPassword = password => this.password = password
}

export default AuthStore