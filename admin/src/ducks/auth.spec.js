import firebase from 'firebase/app'
import { apply, call, put, take } from 'redux-saga/effects'
import {
  signInSaga,
  signUpSaga,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS
} from './auth'

describe('Saga', () => {
  it('sagas: should sign in', () => {
    const authMock = {
      email: 'test@etest.com',
      password: 'qwerty'
    }

    const userMock = {
      id: 123,
      email: authMock.email
    }

    const requestMock = {
      type: SIGN_IN_REQUEST,
      payload: authMock
    }

    const responseMock = {
      type: SIGN_IN_SUCCESS,
      payload: {
        user: userMock
      }
    }

    const saga = signInSaga()
    const auth = firebase.auth()

    expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST))

    expect(saga.next(requestMock).value).toEqual(
      apply(auth, auth.signInWithEmailAndPassword, [
        authMock.email,
        authMock.password
      ])
    )
  })

  it('sagas: sign up', () => {
    const authMock = {
      email: 'test@test.com',
      password: 'qwerty'
    }

    const userMock = {
      id: 123,
      email: authMock.email
    }

    const requestMock = {
      type: SIGN_UP_REQUEST,
      payload: authMock
    }

    const responseMock = {
      type: SIGN_UP_SUCCESS,
      payload: {
        user: userMock
      }
    }

    const saga = signUpSaga(requestMock)
    const auth = firebase.auth()

    expect(saga.next().value).toEqual(
      call(
        [auth, auth.createUserWithEmailAndPassword],
        authMock.email,
        authMock.password
      )
    )

    expect(saga.next(userMock).value).toEqual(put(responseMock))
  })
})
