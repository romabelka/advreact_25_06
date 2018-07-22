import { all, takeEvery, put, call, select, take } from 'redux-saga/effects'
import { appName } from '../config'
import { Record, OrderedSet, OrderedMap } from 'immutable'
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
export const TOGGLE_SELECT = `${prefix}/TOGGLE_SELECT`

export const FETCH_LAZY_REQUEST = `${prefix}/FETCH_LAZY_REQUEST`
export const FETCH_LAZY_START = `${prefix}/FETCH_LAZY_START`
export const FETCH_LAZY_SUCCESS = `${prefix}/FETCH_LAZY_SUCCESS`

export const DELETE_EVENT_REQUEST = `${prefix}/DELETE_EVENT_REQUEST`
export const DELETE_EVENT_SUCCESS = `${prefix}/DELETE_EVENT_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  entities: new OrderedMap(),
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
    case FETCH_ALL_START:
    case FETCH_LAZY_START:
      return state.set('loading', true)

    case FETCH_ALL_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('entities', fbToEntities(payload, EventRecord))

    case FETCH_LAZY_SUCCESS:
      return state
        .set('loading', false)
        .mergeIn(['entities'], fbToEntities(payload, EventRecord))
        .set('loaded', Object.keys(payload).length < 10)

    case TOGGLE_SELECT:
      return state.update(
        'selected',
        (selected) =>
          selected.has(payload.uid)
            ? selected.remove(payload.uid)
            : selected.add(payload.uid)
      )

    case DELETE_EVENT_REQUEST:
      return state.set('loading', true)

    case DELETE_EVENT_SUCCESS:
      return state
        .set('loading', false)
        .deleteIn(['entities', payload.uid])
        .update('selected', (selected) => selected.remove(payload.uid))

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
  entities.valueSeq().toArray()
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

export const idSelector = (state, props) => props.uid
export const eventSelector = createSelector(
  entitiesSelector,
  idSelector,
  (entities, id) => entities.get(id)
)

/**
 * Action Creators
 * */

export function fetchAllEvents() {
  return {
    type: FETCH_ALL_REQUEST
  }
}

export const selectEvent = (uid) => ({
  type: TOGGLE_SELECT,
  payload: { uid }
})

export function fetchLazy() {
  return {
    type: FETCH_LAZY_REQUEST
  }
}

export function deleteEvent(uid) {
  return {
    type: DELETE_EVENT_REQUEST,
    payload: { uid }
  }
}

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

export const fetchLazySaga = function*() {
  while (true) {
    yield take(FETCH_LAZY_REQUEST)

    const state = yield select(stateSelector)

    if (state.loading || state.loaded) continue
    //        if (state.loaded) return

    yield put({
      type: FETCH_LAZY_START
    })

    const lastEvent = state.entities.last()

    const ref = firebase
      .database()
      .ref('events')
      .orderByKey()
      .limitToFirst(10)
      .startAt(lastEvent ? lastEvent.uid : '')

    const data = yield call([ref, ref.once], 'value')

    yield put({
      type: FETCH_LAZY_SUCCESS,
      payload: data.val()
    })
  }
}

export const deleteEventSaga = function*(action) {
  const { payload } = action
  const ref = firebase.database().ref(`events/${payload.uid}`)

  try {
    yield call([ref, ref.remove])

    yield put({
      type: DELETE_EVENT_SUCCESS,
      payload
    })
  } catch (_) {}
}

export function* saga() {
  yield all([
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    fetchLazySaga(),
    takeEvery(DELETE_EVENT_REQUEST, deleteEventSaga)
  ])
}
