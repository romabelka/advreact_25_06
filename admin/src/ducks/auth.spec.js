import { call, put } from 'redux-saga/effects'
import firebase from 'firebase/app'
import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, signUpSaga } from './auth'

describe('Auth duck sign up saga', () => {
  it('should sign up with new email and password', () => {
    const auth = firebase.auth()
    const credentials = {
      email: `test${+new Date()}@test.com`,
      password: 'qwerty123'
    }

    const action = {
      type: SIGN_UP_REQUEST,
      payload: credentials
    }

    const saga = signUpSaga(action)

    expect(saga.next().value).toEqual(
      call(
        [auth, auth.createUserWithEmailAndPassword],
        credentials.email,
        credentials.password
      )
    )

    const user = {
      email: credentials.email,
      uid: '123'
    }

    expect(saga.next(user).value).toEqual(
      put({
        type: SIGN_UP_SUCCESS,
        payload: { user }
      })
    )
  })
})
