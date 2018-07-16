import { appName } from '../config'
import { Record, List } from 'immutable'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import { put, takeEvery, call, all } from 'redux-saga/effects'
import { generateId } from './utils'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON = `${prefix}/ADD_PERSON`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`
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
  entities: new List([
    new PersonRecord({
      firstName: 'Roman',
      lastName: 'Iakobchuk',
      email: 'asdf@adsf.com',
      uid: 1
    }),
    new PersonRecord({
      firstName: 'ASD',
      lastName: 'SDFsdfg',
      email: 'gjkhk@adsf.com',
      uid: 2
    })
  ])
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_PERSON:
      return state.update('entities', (entities) =>
        entities.push(new PersonRecord(payload.person))
      )

    case DELETE_PERSON:
      return state.update('entities', (entities) =>
        entities.filter(function(item) {
          return item.get('uid') !== payload.personUid
        })
      )

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

export function deletePerson(personUid) {
  return {
    type: DELETE_PERSON,
    payload: { personUid }
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

/**
 * Sagas
 */

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
  const successAction = {
    type: DELETE_PERSON_SUCCESS,
    payload: { uid: action.payload.personUid }
  }

  yield put(successAction)
}

export function* saga() {
  yield all([
    takeEvery(ADD_PERSON, addPersonSaga),
    takeEvery(DELETE_PERSON, deletePersonSaga)
  ])
}
