import firebase from 'firebase/app'
import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import { put, takeEvery, call, all } from 'redux-saga/effects'
import { generateId, fbToEntities } from './utils'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON = `${prefix}/ADD_PERSON`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

export const FETCH_PERSONS = `${prefix}/FETCH_PERSONS`
export const FETCH_PERSONS_SUCCESS = `${prefix}/FETCH_PERSONS_SUCCESS`

export const DELETE_PERSON = `${prefix}/DELETE_PERSON`
export const DELETE_PERSON_SUCCESS = `${prefix}/DELETE_PERSON_SUCCESS`

export const ADD_EVENT = `${prefix}/ADD_EVENT`

/**
 * Reducer
 * */
const PersonRecord = Record({
  uid: null,
  firstName: null,
  lastName: null,
  email: null,
  events: []
})

const ReducerState = Record({
  entities: new OrderedMap()
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_PERSON:
      return state.mergeIn(['entities'], fbToEntities(payload, PersonRecord))
    case FETCH_PERSONS_SUCCESS:
      return state.mergeIn(['entities'], fbToEntities(payload, PersonRecord))
    case DELETE_PERSON_SUCCESS:
      return state.removeIn(['entities', action.payload])
    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const peopleSelector = createSelector(stateSelector, (state) =>
  state.entities.valueSeq().toArray()
)

export const uidSelector = (_, props) => props.uid
export const personSelector = createSelector(
  stateSelector,
  uidSelector,
  (state, uid) => state.entities.find((person) => person.uid === uid)
)

/**
 * Action Creators
 * */

export function addPerson(person) {
  return {
    type: ADD_PERSON,
    payload: { person }
  }
}

export function addEventToPerson(eventUid, personUid) {
  return {
    type: ADD_EVENT,
    payload: {
      eventUid,
      personUid
    }
  }
}

export function fetchPersons() {
  return {
    type: FETCH_PERSONS
  }
}

export function deletePerson(personId) {
  return {
    type: DELETE_PERSON,
    payload: { personId }
  }
}
/**
 * Sagas
 */

export function* addPersonSaga(action) {
  // const uid = yield call(generateId)

  const successAction = {
    type: ADD_PERSON_SUCCESS,
    payload: action.payload.person
  }
  const ref = firebase.database().ref('/peoples')
  yield call([ref, ref.push], successAction.payload)
  yield put(successAction)
  yield put(reset('person'))
}

export function* fetchPersonsSaga() {
  const ref = firebase.database().ref('/peoples')
  const resp = yield call([ref, ref.once], 'value')
  if (resp.val()) {
    yield put({
      type: FETCH_PERSONS_SUCCESS,
      payload: resp.val()
    })
  }
}

export function* deletePersonSaga(action) {
  const ref = firebase.database().ref(`/peoples/${action.payload.personId}`)
  yield call([ref, ref.remove])
  yield put({
    type: DELETE_PERSON_SUCCESS,
    payload: action.payload
  })
}

export function* saga() {
  yield all([
    takeEvery(ADD_PERSON, addPersonSaga),
    takeEvery(FETCH_PERSONS, fetchPersonsSaga),
    takeEvery(DELETE_PERSON, deletePersonSaga)
  ])
}
