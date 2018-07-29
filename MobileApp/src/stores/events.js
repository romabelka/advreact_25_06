import {observable, action} from 'mobx'

class EventsStore {
  @observable data = []
  @observable loading = false

  @action setData = data => this.data = data
  @action toggleLoading = () => this.loading = !this.loading
}

export default EventsStore