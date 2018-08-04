import EntitiesStore, {loadAllHelper}  from './entities-store'
import {computed, action} from 'mobx'
import groupBy from 'lodash/groupBy'
import firebase from 'firebase/app'
import { decode } from 'base64-arraybuffer'

class PeopleStore extends EntitiesStore {
    @computed get sections() {
        const grouped = groupBy(this.list, person => person.firstName.charAt(0))

        return Object.entries(grouped).map(([letter, list]) => ({
            title: `${letter}, ${list.length} people`,
            data: list.map(person => ({key: person.uid, person}))
        }))
    }

    @action loadAll = loadAllHelper('people')
    
    @action updateAvatarUrl = (avatarUrl, uid) => {
        firebase.database().ref(`people/${uid}`).update({
            avatar: avatarUrl
        })
    }
    
    @action updateAvatar = async (base64, uid) => {
        const avatarRef = firebase.storage().ref(`/avatars/${uid}.jpg`)
        const bytes = decode(base64)
        
        await avatarRef.put(bytes)
        avatarUrl = await avatarRef.getDownloadURL()
        /*
            почему-то генерируется URL такой картинки, которую не могу открыть при скачивании
            картинка также не отображается в приложении.. не пойму почему,
            т.к. когда пробую декодировать передаваемый base64 вручную (через онлайн сервис),
            сервис мне возвращает корректное изображение
        */
        this.updateAvatarUrl(avatarUrl, uid)
    }
}

export default PeopleStore