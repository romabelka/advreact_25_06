import firebase from 'firebase'
import reducer, {
  signUpSaga,
  signInSaga,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_REQUESTS_LIMIT,
  ReducerRecord
} from './auth'
import { take, call, apply, put, actionChannel } from 'redux-saga/effects'
import { channel, buffers } from 'redux-saga'

/**
 * Saga tests
 * */

it('should sign up', () => {
  const authData = {
    email: 'lala@example.com',
    password: '12341234'
  }

  const user = {
    email: authData.email,
    uid: Math.random().toString()
  }

  const requestAction = {
    type: SIGN_UP_REQUEST,
    payload: authData
  }

  const saga = signUpSaga()
  const auth = firebase.auth()

  const mockChan = channel()
  expect(saga.next().value).toEqual(actionChannel(SIGN_UP_REQUEST))

  expect(saga.next(mockChan).value).toEqual(take(mockChan))

  expect(saga.next(requestAction).value).toEqual(
    call(
      [auth, auth.createUserWithEmailAndPassword],
      authData.email,
      authData.password
    )
  )

  expect(saga.next(user).value).toEqual(
    put({ type: SIGN_UP_SUCCESS, payload: { user } })
  )
})

it('should sign in', () => {
  const auth = firebase.auth()
  const authData = {
    email: 'lala@example.com',
    password: '12341234'
  }

  const user = {
    email: authData.email,
    uid: Math.random().toString()
  }

  const requestAction = {
    type: SIGN_IN_REQUEST,
    payload: authData
  }

  const saga = signInSaga()

  const mockChan = channel()
  const mockBuffer = buffers.sliding(1)

  //запрашивает буфер
  saga.next()

  expect(saga.next(mockBuffer).value).toEqual(
    actionChannel(SIGN_IN_REQUEST, mockBuffer)
  )
  expect(saga.next(mockChan).value).toEqual(take(mockChan))

  expect(saga.next(requestAction).value).toEqual(
    apply(auth, auth.signInWithEmailAndPassword, [
      authData.email,
      authData.password
    ])
  )
})

it('should not allow to sign in more then 3 times', () => {
  const auth = firebase.auth()
  const authData = {
    email: 'lala@example.com',
    password: '12341234'
  }

  const user = {
    email: authData.email,
    uid: Math.random().toString()
  }

  const requestAction = {
    type: SIGN_IN_REQUEST,
    payload: authData
  }

  const saga = signInSaga()

  const mockChan = channel()
  const mockBuffer = buffers.sliding(1)

  //запрашивает буфер
  saga.next()

  expect(saga.next(mockBuffer).value).toEqual(
    actionChannel(SIGN_IN_REQUEST, mockBuffer)
  )

  for (let i = 0; i < 3; i++) {
    expect(saga.next(mockChan).value).toEqual(take(mockChan))

    saga.next(requestAction)
    saga.throw(new Error('invalid password'))
  }

  expect(saga.next().value).toEqual(put({ type: SIGN_IN_REQUESTS_LIMIT }))
})

/**
 * Reducer Tests
 * */

it('should sign in', () => {
  const state = new ReducerRecord()
  const user = {
    email: 'lala@example.com',
    uid: Math.random().toString()
  }

  const newState = reducer(state, {
    type: SIGN_IN_SUCCESS,
    payload: { user }
  })

  expect(newState).toEqual(new ReducerRecord({ user }))
})
