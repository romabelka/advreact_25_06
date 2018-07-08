import { Record, OrderedMap } from 'immutable'
import { createSelector } from 'reselect'
import { put, takeEvery, call } from 'redux-saga/effects'
import firebase from 'firebase/app'

import { appName } from '../config'

/**
 * Constants
 * */

export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const FETCH_EVENTS_REQUEST = `${prefix}/FETCH_EVENTS_REQUEST`
export const FETCH_EVENTS_SUCCESS = `${prefix}/FETCH_EVENTS_SUCCESS`
export const FETCH_EVENTS_FAILURE = `${prefix}/FETCH_EVENTS_FAILURE`

/**
 * Reducer
 * */

const ReducerState = Record({
  entities: new OrderedMap([]),
  loading: false,
  isError: false
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
  const { type, payload } = action

  switch (type) {
    case FETCH_EVENTS_FAILURE:
      return state.set('isError', true)

    case FETCH_EVENTS_REQUEST:
      return state.set('loading', true).set('isError', false)

    case FETCH_EVENTS_SUCCESS:
      const entities = Object.entries(payload.events).reduce(
        (acc, [id, value]) => acc.set(id, new EventRecord({ id, ...value })),
        new OrderedMap({})
      )

      return state.set('entities', entities).set('loading', false)

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
export const loadingSelector = (state) => stateSelector(state).loading
export const errorSelector = (state) => stateSelector(state).isError

/**
 * Action Creators
 * */

export const fetchEvents = () => ({ type: FETCH_EVENTS_REQUEST })

/**
 * Sagas
 */

export function* fetchEventsSaga() {
  try {
    const eventsRef = firebase.database().ref('/events')
    const events = yield call([eventsRef, eventsRef.once], 'value')
    yield put({
      type: FETCH_EVENTS_SUCCESS,
      payload: {
        events: events.val()
      }
    })
  } catch (error) {
    yield put({
      type: FETCH_EVENTS_FAILURE,
      error
    })
  }
}

export function* saga() {
  yield takeEvery(FETCH_EVENTS_REQUEST, fetchEventsSaga)
}
