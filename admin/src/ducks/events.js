import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'
import firebase from 'firebase/app'
import { takeLatest, put, call } from 'redux-saga/effects'
import { createSelector } from 'reselect'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const FETCH_EVENTS_REQUEST = `${prefix}/FETCH_EVENTS_REQUEST`
export const FETCH_EVENTS_SUCCESS = `${prefix}/FETCH_EVENTS_SUCCESS`
export const FETCH_EVENTS_ERROR = `${prefix}/FETCH_EVENTS_ERROR`

/**
 * Reducer
 * */
const ReducerState = Record({
  data: new OrderedMap(),
  isLoading: false,
  error: null
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

export default function reducer(state = new ReducerState(), action) {
  const { type, payload, error } = action

  switch (type) {
    case FETCH_EVENTS_REQUEST: {
      return state.set('isLoading', true)
    }

    case FETCH_EVENTS_SUCCESS: {
      return state
        .set('isLoading', false)
        .set('data', createEventsRecords(payload))
    }

    case FETCH_EVENTS_ERROR: {
      return state.set('isLoading', false).set('error', error)
    }

    default:
      return state
  }
}

/**
 * Selectors
 * */
export const stateSelector = (state) => state[moduleName]
export const eventsSelector = createSelector(stateSelector, (state) =>
  state.data.valueSeq().toArray()
)
export const errorSeloctor = createSelector(
  stateSelector,
  (state) => state.error
)
export const isLoadingSelector = createSelector(
  stateSelector,
  (state) => state.isLoading
)

/**
 * Action Creators
 * */
export function fetchEvents() {
  return {
    type: FETCH_EVENTS_REQUEST
  }
}

/**
 * Sagas
 */
export function* fetchEventsSaga() {
  const eventsRef = firebase.database().ref('events')

  try {
    const events = yield call([eventsRef, eventsRef.once], 'value')

    yield put({
      type: FETCH_EVENTS_SUCCESS,
      payload: events.val()
    })
  } catch (error) {
    yield put({
      type: FETCH_EVENTS_ERROR,
      error
    })
  }
}

export function* saga() {
  yield takeLatest(FETCH_EVENTS_REQUEST, fetchEventsSaga)
}

function createEventsRecords(events) {
  return Object.entries(events).reduce(
    (eventsMap, [id, value]) =>
      eventsMap.set(id, new EventRecord({ id, ...value })),
    new OrderedMap({})
  )
}
