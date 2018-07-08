import { appName } from '../config'
import { Record, List } from 'immutable'
import { createSelector } from 'reselect'
import { takeEvery, call, put } from 'redux-saga/effects'
import firebase from 'firebase/app'
import Immutable from 'immutable'

/**
 * Constants
 * */
export const moduleName = 'event'
const prefix = `${appName}/${moduleName}`
export const LOAD_ALL_EVENTS = `${prefix}/LOAD_ALL_EVENTS`
export const LOAD_ALL_EVENTS_SUCCESS = `${prefix}/LOAD_ALL_EVENTS_SUCCESS`
export const LOAD_ALL_EVENTS_ERROR = `${prefix}/LOAD_ALL_EVENTS_ERROR`
export const LOAD_ALL_EVENTS_START = `${prefix}/LOAD_ALL_EVENTS_START`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new List([]),
  loading: false,
  error: null
})

const EventRecord = Record({
  id: null,
  title: null,
  url: null,
  where: null,
  when: null,
  submissionDeadline: null,
  month: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case LOAD_ALL_EVENTS_START:
      return state.set('loading', true)
    case LOAD_ALL_EVENTS_SUCCESS:
      return state.set('entities', payload.events).set('loading', false)

    default:
      return state
  }
}

/**
 * Action Creators
 * */

export function loadAllEvents() {
  return {
    type: LOAD_ALL_EVENTS,
    payload: {}
  }
}

/**
 * Selectors
 * */
export const stateSelector = (state) => state[moduleName]
export const eventSelector = createSelector(stateSelector, (state) => {
  return state.entities.valueSeq().toArray()
})
export const loadingEventsSelector = createSelector(
  stateSelector,
  (state) => state.loading
)

/**
 * Sagas
 */
export function* loadAllEventsSaga(action) {
  yield put({
    type: LOAD_ALL_EVENTS_START,
    payload: { loading: true, events: new List([]) }
  })
  const eventsRef = firebase.database().ref('/events')
  try {
    const eventsResponse = yield call([eventsRef, eventsRef.once], 'value')
    const events = Immutable.Map(eventsResponse.val()).reduce(
      (acc, item) => acc.push(new EventRecord(item)),
      new List([])
    )
    yield put({
      type: LOAD_ALL_EVENTS_SUCCESS,
      payload: { loading: false, events: events }
    })
  } catch (e) {
    yield put({
      type: LOAD_ALL_EVENTS_ERROR,
      payload: { loading: false, error: e, events: new List([]) }
    })
  }
}

export function* saga() {
  yield takeEvery(LOAD_ALL_EVENTS, loadAllEventsSaga)
}
