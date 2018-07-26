import {observable, action} from 'mobx'

class AuthStore {
    @observable email = ''
    @observable password = ''

    @action setEmail = email => this.email = email
    @action setPassword = password => this.password = password
}

export default AuthStore