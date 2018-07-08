import { call, take, put, apply } from 'redux-saga/effects'
import firebase from 'firebase/app'
import {
  SIGN_IN_REQUEST,
  SIGN_IN_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN_MAX_TRIES_ERROR,
  signInSaga,
  signUpSaga
} from './auth'

describe('Saga', () => {
  describe('sign in', () => {
    it('should success', () => {
      const saga = signInSaga()

      expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST))

      const payload = { email: 'test@test.com', password: 'test password' }
      const auth = firebase.auth()

      expect(saga.next({ payload }).value).toEqual(
        apply(auth, auth.signInWithEmailAndPassword, [
          payload.email,
          payload.password
        ])
      )
    })

    const checkIncorrectSignIn = (saga) => {
      expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST))

      const payload = { email: 'test@test.com', password: 'test password' }
      const auth = firebase.auth()

      expect(saga.next({ payload }).value).toEqual(
        apply(auth, auth.signInWithEmailAndPassword, [
          payload.email,
          payload.password
        ])
      )
      const error = new Error('error')
      expect(saga.throw(error).value).toEqual(
        put({ type: SIGN_IN_ERROR, error })
      )
    }

    it('should error', () => {
      const saga = signInSaga()

      for (let i = 0; i < 3; i++) {
        checkIncorrectSignIn(saga)
      }

      expect(saga.next().value).toEqual(
        put({
          type: SIGN_IN_MAX_TRIES_ERROR
        })
      )
    })
  })

  describe('sign up', () => {
    it('should success', () => {
      const action = {
        payload: { email: 'test@test.conm', password: 'pass12345678' }
      }
      const { payload } = action
      const auth = firebase.auth()

      const saga = signUpSaga(action)
      expect(saga.next().value).toEqual(
        call(
          [auth, auth.createUserWithEmailAndPassword],
          payload.email,
          payload.password
        )
      )
      const user = { firstName: 'testName' }
      expect(saga.next(user).value).toEqual(
        put({ type: SIGN_UP_SUCCESS, payload: { user } })
      )
    })

    it('should error', () => {
      const action = {
        payload: { email: 'test@test.conm', password: 'pass12345678' }
      }
      const { payload } = action
      const auth = firebase.auth()

      const saga = signUpSaga(action)
      expect(saga.next().value).toEqual(
        call(
          [auth, auth.createUserWithEmailAndPassword],
          payload.email,
          payload.password
        )
      )
      const error = new Error('error msg')
      expect(saga.throw(error).value).toEqual(
        put({ type: SIGN_UP_ERROR, error })
      )
    })
  })
})
