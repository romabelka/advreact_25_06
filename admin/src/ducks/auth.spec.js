import { call, put, take, apply } from 'redux-saga/effects'
import {
  SIGN_UP_ERROR,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_IN_REQUEST,
  signUpSaga,
  signInSaga,
  signIn,
  SIGN_IN_ERROR,
  SIGN_IN_MAX_TRIES_ERROR
} from './auth'
import firebase from 'firebase/app'

describe('signUpSaga', () => {
  it('should signup success', () => {
    const user = {
      email: 'test@javascript.ru',
      password: '12345678'
    }
    const action = {
      type: SIGN_UP_REQUEST,
      payload: { ...user }
    }

    const saga = signUpSaga(action)

    const auth = firebase.auth()
    expect(saga.next().value).toEqual(
      call(
        [auth, auth.createUserWithEmailAndPassword],
        user.email,
        user.password
      )
    )

    expect(saga.next(user).value).toEqual(
      put({
        type: SIGN_UP_SUCCESS,
        payload: { user }
      })
    )

    expect(saga.next().done).toBe(true)
  })
  it('should signup error', () => {
    const user = {
      email: 'test@javascript.ru',
      password: '12345678'
    }
    const action = {
      type: SIGN_UP_REQUEST,
      payload: { ...user }
    }

    const saga = signUpSaga(action)

    const auth = firebase.auth()
    expect(saga.next().value).toEqual(
      call(
        [auth, auth.createUserWithEmailAndPassword],
        user.email,
        user.password
      )
    )

    const error = 'error'
    expect(saga.throw(error).value).toEqual(
      put({
        type: SIGN_UP_ERROR,
        error: error
      })
    )

    expect(saga.next().done).toBe(true)
  })
})

describe('signInSaga', () => {
  it('should signin success', () => {
    const user = {
      email: 'test@javascript.ru',
      password: '12345678'
    }

    const saga = signInSaga()

    const auth = firebase.auth()
    expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST))
    signIn(user.email, user.password)
    expect(
      saga.next({
        type: SIGN_IN_REQUEST,
        payload: user
      }).value
    ).toEqual(
      apply(auth, auth.signInWithEmailAndPassword, [user.email, user.password])
    )

    expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST))
  })

  it('should signin error if invalid credentials', () => {
    const user = {
      email: 'test@javascript.ru',
      password: '12345678'
    }

    const saga = signInSaga()

    const auth = firebase.auth()
    expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST))
    signIn(user.email, user.password)

    expect(
      saga.next({
        type: SIGN_IN_REQUEST,
        payload: user
      }).value
    ).toEqual(
      apply(auth, auth.signInWithEmailAndPassword, [user.email, user.password])
    )

    const error = 'error'
    expect(saga.throw(error).value).toEqual(
      put({
        type: SIGN_IN_ERROR,
        error: error
      })
    )

    expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST))
  })
  it('should signin error if more then 3 times', () => {
    const user = {
      email: 'test@javascript.ru',
      password: '12345678'
    }

    const saga = signInSaga()

    const auth = firebase.auth()
    for (let i = 0; i < 3; i++) {
      expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST))
      signIn(user.email, user.password)
      saga.next({
        type: SIGN_IN_REQUEST,
        payload: user
      })
    }

    expect(saga.next().value).toEqual(
      put({
        type: SIGN_IN_MAX_TRIES_ERROR
      })
    )
  })
})
