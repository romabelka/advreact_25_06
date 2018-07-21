import { appName } from '../config'
import { Record } from 'immutable'
import firebase from 'firebase/app'
import { createSelector } from 'reselect'
import {
  takeEvery,
  put,
  call,
  apply,
  take,
  all,
  spawn
} from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`
export const SIGN_IN_REQUESTS_LIMIT = `${prefix}/SIGN_IN_REQUESTS_LIMIT`
export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  user: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case SIGN_IN_SUCCESS:
      return state.set('user', payload.user)

    default:
      return state
  }
}

/**
 * Selectors
 * */

export const userSelector = (state) => state[moduleName].user
export const isAuthorizedSelector = createSelector(
  userSelector,
  (user) => !!user
)

/**
 * Action Creators
 * */

export function signIn(email, password) {
  return {
    type: SIGN_IN_REQUEST,
    payload: { email, password }
  }
}

export function signUp(email, password) {
  return {
    type: SIGN_UP_REQUEST,
    payload: { email, password }
  }
}

/**
 * Sagas
 */

const createEventChannel = () =>
  eventChannel((emit) =>
    firebase.auth().onAuthStateChanged((user) => emit({ user }))
  )

export function* realtimeSyncSaga() {
  const channel = yield call(createEventChannel)

  while (true) {
    const { user } = yield take(channel)

    if (user) {
      yield put({
        type: SIGN_IN_SUCCESS,
        payload: { user }
      })
    }
  }
}

export function* signUpSaga({ payload }) {
  const auth = firebase.auth()

  try {
    const user = yield call(
      [auth, auth.createUserWithEmailAndPassword],
      payload.email,
      payload.password
    )

    yield put({
      type: SIGN_UP_SUCCESS,
      payload: { user }
    })
  } catch (error) {
    yield put({
      type: SIGN_UP_ERROR,
      error
    })
  }
}

export function* signInSaga() {
  for (let i = 0; i < 3; i++) {
    const { payload } = yield take(SIGN_IN_REQUEST)

    const auth = firebase.auth()

    try {
      yield apply(auth, auth.signInWithEmailAndPassword, [
        payload.email,
        payload.password
      ])
    } catch (error) {
      yield put({
        type: SIGN_IN_ERROR,
        error
      })
    }
  }

  yield put({
    type: SIGN_IN_REQUESTS_LIMIT
  })
}

export function* saga() {
  yield spawn(realtimeSyncSaga)

  yield all([takeEvery(SIGN_UP_REQUEST, signUpSaga), signInSaga()])
}
