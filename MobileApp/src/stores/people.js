import firebase from 'firebase/app'
import {action, observable} from 'mobx'
import {entitiesFromFB} from './utils'

class PeopleStore {
    @observable loading = false
    @observable list = []
    @observable error = false

    getPeople = action(() => {
        this.loading = true
            firebase.database().ref('people').once('value')
                .then(action(data => {
                    this.loading = false
                    this.list = entitiesFromFB(data.val())
                }))
    })
}

export default PeopleStore