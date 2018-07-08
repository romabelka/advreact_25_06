import conferences from './conferences'
import firebase from 'firebase/app'

export function saveEventsToFB() {
  const eventsRef = firebase.database().ref('/events')
  conferences.forEach((conference) => eventsRef.push(conference))
}

export function readEventsFromFB() {
  const eventsRef = firebase.database().ref('/events')
  eventsRef.once('value').then(function(snapshot) {
    return snapshot.val()
  })
}

window.saveEventsToFB = saveEventsToFB
window.readEventsFromFB = readEventsFromFB
