import { appName } from '../config'
import { Record } from 'immutable'
import firebase from 'firebase/app'
import { createSelector } from 'reselect'
import {
  put,
  call,
  apply,
  take,
  all,
  actionChannel,
  fork
} from 'redux-saga/effects'
import { buffers } from 'redux-saga'

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

export function* signUpSaga() {
  const auth = firebase.auth()
  const channel = yield actionChannel(SIGN_UP_REQUEST)
  while (true) {
    const { payload } = yield take(channel)
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
}

export function* signInSaga() {
  const channel = yield actionChannel(SIGN_IN_REQUEST, yield buffers.sliding(1))
  for (let i = 0; i < 3; i++) {
    const { payload } = yield take(channel)

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
  yield fork(signUpSaga())
  yield fork(signInSaga())
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    window.store.dispatch({
      type: SIGN_IN_SUCCESS,
      payload: { user }
    })
  }
})
