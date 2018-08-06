import EntitiesStore, {subscribeHelper}  from './entities-store'
import {computed, action} from 'mobx'
import groupBy from 'lodash/groupBy'
import firebase from 'firebase/app'

class PeopleStore extends EntitiesStore {
    @computed get sections() {
        const grouped = groupBy(this.list, person => person.firstName.charAt(0))

        return Object.entries(grouped).map(([letter, list]) => ({
            title: `${letter}, ${list.length} people`,
            data: list.map(person => ({key: person.uid, person}))
        }))
    }

    @action updatePerson(uid, data) {
        firebase.database().ref(`people/${uid}`).update(data)
    }

    @action loadAll = subscribeHelper('people')

    async takePhoto(uid, base64) {
        const ref = firebase.storage().ref(`/avatars/${uid}.jpg`)

        await ref.putString(base64, 'base64', {contentType:'image/jpeg'})
        const avatar = await ref.getDownloadURL()

        this.updatePerson(uid, {avatar})
    }
}

export default PeopleStore