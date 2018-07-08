import { Record, OrderedMap } from 'immutable'
import { put, takeLatest, call } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import { delay } from 'redux-saga'
import firebase from 'firebase/app'

// Constants
export const moduleName = 'events'
export const GET_EVENTS_REQUEST = `${moduleName}/GET_EVENTS_REQUEST`
export const GET_EVENTS_SUCCESS = `${moduleName}/GET_EVENTS_SUCCESS`
export const GET_EVENTS_ERROR = `${moduleName}/GET_EVENTS_ERROR`

// Reducer
const ReducerState = Record({
  entities: new OrderedMap([]),
  fetching: false
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
    case GET_EVENTS_REQUEST:
      return state.set('fetching', true)
    case GET_EVENTS_SUCCESS:
      return state.set('fetching', false).set('entities', payload)
    case GET_EVENTS_ERROR:
      return state.set('fetching', false)
    default:
      return state
  }
}

// Selectors
export const stateSelector = (state) => state[moduleName]
export const eventsSelector = createSelector(
  stateSelector,
  // state => state.entities.valueSeq().toArray()
  (state) => state.entities
)

// Action Creators
export const getEvents = () => ({
  type: GET_EVENTS_REQUEST
})

// Sagas
function* getEventsSaga() {
  const ref = firebase.database().ref('/events')
  // делей для видимости лоадера
  yield call(delay, 1000)

  const snapshot = yield call([ref, ref.once], 'value')

  yield put({
    type: GET_EVENTS_SUCCESS,
    payload: snapshot.val()
  })
}

export function* saga() {
  yield takeLatest(GET_EVENTS_REQUEST, getEventsSaga)
}

// utils
export const eventsResponseToState = (events) => {
  console.log(events)
  return []
}
