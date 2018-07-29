import firebase from 'firebase/app'
import stores from '../stores'

const LoadPeople = () => {
  stores.people.toggleLoading()
  const ref = firebase.database().ref('people')
  ref.once('value')
    .then(snapshot => {
      const people = Object.entries(snapshot.val()).map(([uid, people]) => ({...people, uid}))
      console.log(people);
      stores.people.setData(people)
    })
    .finally(()=>stores.people.toggleLoading())
}


export default LoadPeople