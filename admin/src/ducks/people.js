import { appName } from '../config'
import { Record, List } from 'immutable'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import { put, takeEvery, call } from 'redux-saga/effects'
import { generateId } from './utils'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON = `${prefix}/ADD_PERSON`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new List([])
})

const PersonRecord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_PERSON:
      return state.update('entities', (entities) =>
        entities.push(new PersonRecord(payload.person))
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

/**
 * Action Creators
 * */

export function addPerson(person) {
  return {
    type: ADD_PERSON,
    payload: { person }
  }
}

/**
 * Sagas
 */

export function* addPersonSaga(action) {
  const id = yield call(generateId)

  const successAction = {
    type: ADD_PERSON_SUCCESS,
    payload: { id, ...action.payload.person }
  }

  yield put(successAction)
  yield put(reset('person'))
}

export function* saga() {
  yield takeEvery(ADD_PERSON, addPersonSaga)
}
