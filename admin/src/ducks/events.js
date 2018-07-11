import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { appName } from '../config'
import { Record, List, OrderedSet } from 'immutable'
import firebase from 'firebase/app'
import { createSelector } from 'reselect'
import { fbToEntities } from './utils'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const FETCH_LAZY_REQUEST = `${prefix}/FETCH_LAZY_REQUEST`
export const FETCH_LAZY_START = `${prefix}/FETCH_LAZY_START`
export const FETCH_LAZY_SUCCESS = `${prefix}/FETCH_LAZY_SUCCESS`
export const FETCH_LAZY_FAIL = `${prefix}/FETCH_LAZY_FAIL`

export const TOGGLE_SELECT = `${prefix}/TOGGLE_SELECT`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  error: false,
  entities: new List([]),
  selected: new OrderedSet()
})

export const EventRecord = Record({
  uid: null,
  month: null,
  submissionDeadline: null,
  title: null,
  url: null,
  when: null,
  where: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_LAZY_FAIL:
      return state.set('loading', false).set('error', true)

    case FETCH_ALL_START:
    case FETCH_LAZY_START:
      return state.set('loading', true).set('error', false)

    case FETCH_ALL_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('entities', fbToEntities(payload, EventRecord))

    case FETCH_LAZY_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', Object.keys(payload).length < 10)
        .update('entities', (entities) =>
          entities.push(...fbToEntities(payload, EventRecord))
        )

    case TOGGLE_SELECT:
      return state.update(
        'selected',
        (selected) =>
          selected.has(payload.uid)
            ? selected.remove(payload.uid)
            : selected.add(payload.uid)
      )

    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const entitiesSelector = createSelector(
  stateSelector,
  (state) => state.entities
)
export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
)
export const loadedSelector = createSelector(
  stateSelector,
  (state) => state.loaded
)
export const eventListSelector = createSelector(entitiesSelector, (entities) =>
  entities.toArray()
)

export const selectionSelector = createSelector(
  stateSelector,
  (state) => state.selected
)

export const selectedEventsSelector = createSelector(
  eventListSelector,
  selectionSelector,
  (eventList, selectedIds) =>
    eventList.filter((event) => selectedIds.has(event.uid))
)

/**
 * Action Creators
 * */

export function fetchAllEvents() {
  return {
    type: FETCH_ALL_REQUEST
  }
}

export const fetchEventsLazy = () => ({
  type: FETCH_LAZY_REQUEST
})

export const selectEvent = (uid) => ({
  type: TOGGLE_SELECT,
  payload: { uid }
})

/**
 * Sagas
 * */

export function* fetchAllSaga() {
  const eventsState = yield select(stateSelector)
  if (eventsState.loading || eventsState.loaded) return

  yield put({
    type: FETCH_ALL_START
  })

  const ref = firebase.database().ref('events')
  const snapshot = yield call([ref, ref.once], 'value')

  yield put({
    type: FETCH_ALL_SUCCESS,
    payload: snapshot.val()
  })
}

export function* fetchLazySaga() {
  try {
    const eventsState = yield select(stateSelector)
    if (eventsState.loading) {
      return
    }

    yield put({ type: FETCH_LAZY_START })

    const lastEvent = eventsState.entities.last()
    const key = lastEvent ? lastEvent.uid : ''

    const ref = firebase
      .database()
      .ref('events')
      .orderByKey()
      .limitToFirst(10)
      .startAt(key)

    const snapshot = yield call([ref, ref.once], 'value')

    yield put({
      type: FETCH_LAZY_SUCCESS,
      payload: snapshot.val()
    })
  } catch (error) {
    yield put({
      type: FETCH_LAZY_FAIL,
      payload: error
    })
  }
}

export function* saga() {
  yield all([
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    takeEvery(FETCH_LAZY_REQUEST, fetchLazySaga)
  ])
}
