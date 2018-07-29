import {observable, action} from 'mobx'

class PeopleStore {
  @observable data = []
  @observable loading = false

  @action setData = data => this.data = data
  @action toggleLoading = () => this.loading = !this.loading
}

export default PeopleStore