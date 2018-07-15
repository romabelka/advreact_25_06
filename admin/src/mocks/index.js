import firebase from 'firebase/app'
import conferences from './conferences'
import people from './people'

export function saveEventsToFB() {
  const eventsRef = firebase.database().ref('/events')
  conferences.forEach((conference) => eventsRef.push(conference))
}

export function savePeopleToFb() {
  const peopleRef = firebase.database().ref('/people')
  people.forEach((item) => peopleRef.push(item))
}

window.saveEventsToFB = saveEventsToFB
window.savePeopleToFb = savePeopleToFb
