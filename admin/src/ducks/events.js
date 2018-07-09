import { appName } from '../config'
import { Record, List } from 'immutable'
import firebase from 'firebase/app'
import { takeEvery, put, call } from 'redux-saga/effects'
import { createSelector } from 'reselect'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const LOAD_EVENTS_REQUEST = `${prefix}/LOAD_EVENTS_REQUEST`
export const LOAD_EVENTS_SUCCESS = `${prefix}/LOAD_EVENTS_SUCCESS`
export const LOAD_EVENTS_ERROR = `${prefix}/LOAD_EVENTS_ERROR`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  entities: new List([]),
  loading: false,
  loaded: false
})
const EventRecord = Record({
  id: null,
  title: null,
  url: null,
  where: null,
  when: null,
  month: null,
  submissionDeadline: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case LOAD_EVENTS_REQUEST:
      return state.set('loading', true)

    case LOAD_EVENTS_SUCCESS:
      return state
        .update('entities', (entities) => {
          let newEntities = []
          for (let id in payload)
            newEntities.push(new EventRecord({ ...payload[id], id }))
          return new List(newEntities)
        })
        .set('loading', false)
        .set('loaded', true)

    case LOAD_EVENTS_ERROR:
      return state

    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const eventsSelector = createSelector(stateSelector, (state) =>
  state.entities.valueSeq().toArray()
)

/**
 * Action Creators
 * */

export function loadEvents() {
  return {
    type: LOAD_EVENTS_REQUEST,
    payload: {}
  }
}

export function* loadEventsSaga(action) {
  const databaseEvents = firebase.database().ref('/events/')

  try {
    const snapshot = yield call([databaseEvents, databaseEvents.once], 'value')

    yield put({
      type: LOAD_EVENTS_SUCCESS,
      payload: snapshot.val()
    })
  } catch (error) {
    yield put({
      type: LOAD_EVENTS_ERROR,
      error
    })
  }
}

export function* saga() {
  yield takeEvery(LOAD_EVENTS_REQUEST, loadEventsSaga)
}
