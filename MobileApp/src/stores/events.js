import firebase from 'firebase/app'
import {action, observable} from 'mobx'
import {entitiesFromFB} from './utils'

class EventsStore {
    @observable loading = false
    @observable list = []
    @observable error = false

    getEvents = action(() => {
        this.loading = true
        firebase.database().ref('events').once('value')
            .then(action(data => {
                this.loading = false
                this.list = entitiesFromFB(data.val(), this.list)
            }))
    })
}

export default EventsStore