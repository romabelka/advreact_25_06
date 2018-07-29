import firebase from 'firebase/app'
import stores from '../stores'

const LoadEvents = () => {
  stores.events.toggleLoading()
  const ref = firebase.database().ref('events')
  ref.once('value')
    .then(snapshot => {
      const events = Object.entries(snapshot.val()).map(([uid, event]) => ({...event, uid}))
      stores.events.setData(events)
    })
    .finally(()=>stores.events.toggleLoading())
}


export default LoadEvents