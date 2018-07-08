import { appName } from '../config'
import { Record, List } from 'immutable'
import { createSelector } from 'reselect'
import firebase from 'firebase/app'
import { put, takeEvery, call } from 'redux-saga/effects'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const EVENTS_REQUEST = `${prefix}/EVENTS_REQUES`
export const EVENTS_REQUES_SUCCESS = `${prefix}/EVENTS_REQUES_SUCCESS`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new List([]),
  loading: false
})

const EventRecord = Record({
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
    case EVENTS_REQUEST:
      return state.set('loading', true)
    case EVENTS_REQUES_SUCCESS:
      const { events } = payload
      const newState = state.set('loading', false)
      return Object.keys(events).reduce((acc, key) => {
        return acc.update('entities', (entities) =>
          entities.push(new EventRecord(events[key]))
        )
      }, newState)
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
export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
)

/**
 * Action Creators
 * */

export function loadEvents() {
  return {
    type: EVENTS_REQUEST
  }
}

/**
 * Sagas
 */

export function* loadEvensSaga(action) {
  const ref = firebase.database().ref('events')
  const data = yield call([ref, ref.once], 'value')
  const events = data.val()

  yield put({
    type: EVENTS_REQUES_SUCCESS,
    payload: { events }
  })
}

export function* saga() {
  yield takeEvery(EVENTS_REQUEST, loadEvensSaga)
}
