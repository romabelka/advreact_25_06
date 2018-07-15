import firebase from 'firebase/app'
import { Record, OrderedMap } from 'immutable'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import { all, put, takeEvery, call } from 'redux-saga/effects'
import { appName } from '../config'
import { generateId, fbToEntities } from './utils'

/**
 * Constants
 * */

export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_PERSONS_REQUEST = `${prefix}/FETCH_ALL_PERSONS_REQUEST`
export const FETCH_ALL_PERSONS_START = `${prefix}/FETCH_ALL_PERSONS_START`
export const FETCH_ALL_PERSONS_SUCCESS = `${prefix}/FETCH_ALL_PERSONS_SUCCESS`

export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON_START = `${prefix}/ADD_PERSON_START`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

export const DELETE_PERSON_REQUEST = `${prefix}/DELETE_PERSON_REQUEST`
export const DELETE_PERSON_START = `${prefix}/DELETE_PERSON_START`
export const DELETE_PERSON_SUCCESS = `${prefix}/DELETE_PERSON_SUCCESS`

export const ADD_EVENT_TO_PERSON = `${prefix}/ADD_EVENT_TO_PERSON`

/**
 * Reducer
 * */

const ReducerState = Record({
  loading: false,
  loaded: false,
  entities: new OrderedMap()
})

const PersonRecord = Record({
  uid: null,
  firstName: null,
  lastName: null,
  email: null,
  events: []
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_ALL_PERSONS_START:
      return state.set('loading', true)

    case FETCH_ALL_PERSONS_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('entities', fbToEntities(payload, PersonRecord))

    case ADD_PERSON_SUCCESS:
      return state.update('entities', (entities) =>
        entities.push(new PersonRecord(payload.person))
      )

    case DELETE_PERSON_SUCCESS:
      return state.deleteIn(['entities', payload.uid])

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

export function fetchPeople() {
  return {
    type: FETCH_ALL_PERSONS_REQUEST
  }
}

export function addPerson(person) {
  return {
    type: ADD_PERSON_REQUEST,
    payload: { person }
  }
}

export function deletePerson(uid) {
  return {
    type: DELETE_PERSON_REQUEST,
    payload: {
      uid
    }
  }
}

export function addEventToPerson(eventUid, personUid) {
  return {
    type: ADD_EVENT_TO_PERSON,
    payload: {
      eventUid,
      personUid
    }
  }
}

/**
 * Sagas
 */

export function* fetchAllPersonsSaga() {
  yield put({
    type: FETCH_ALL_PERSONS_START
  })

  const ref = firebase.database().ref('people')
  const data = yield call([ref, ref.once], 'value')

  yield put({
    type: FETCH_ALL_PERSONS_SUCCESS,
    payload: data.val()
  })
}

export function* addPersonSaga(action) {
  const uid = yield call(generateId)

  const successAction = {
    type: ADD_PERSON_SUCCESS,
    payload: { uid, ...action.payload.person }
  }

  yield put(successAction)
  yield put(reset('person'))
}

export function* deletePersonSaga(action) {
  yield put({
    type: DELETE_PERSON_START
  })

  const payload = action.payload
  const peopleUid = payload.uid

  const ref = firebase.database().ref(`/people/${peopleUid}`)
  yield call([ref, ref.remove])

  yield put({
    type: DELETE_PERSON_SUCCESS,
    payload
  })
}

export function* saga() {
  yield all([
    takeEvery(FETCH_ALL_PERSONS_REQUEST, fetchAllPersonsSaga),
    takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    takeEvery(DELETE_PERSON_REQUEST, deletePersonSaga)
  ])
}
