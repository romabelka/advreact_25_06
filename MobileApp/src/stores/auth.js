import {observable, action, computed} from 'mobx'
import { validate } from 'email-validator'

class AuthStore {
  @observable email = ''
  @observable password = ''
  @observable user = null

  @computed get isValidEmail() {
    return validate(this.email)
  }

  @computed get isLoggedIn() {
    return !!this.user
  }

  @action setEmail = email => this.email = email
  @action setPassword = password => this.password = password
  @action setUser = user => this.user = user
}

export default AuthStore