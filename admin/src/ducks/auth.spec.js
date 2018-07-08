import firebase from 'firebase/app'
import { apply, call, take, put } from 'redux-saga/effects'
import reducer, {
  ReducerRecord,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_MAX_TRIES_ERROR,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  signInSaga,
  signUpSaga,
  signIn,
  signUp
} from './auth'

describe('Saga', () => {
  const payload = {
    email: 'test@test.com',
    password: 'random123'
  }

  it('should sign in', () => {
    const action = {
      type: SIGN_IN_REQUEST,
      payload
    }

    const saga = signInSaga(action)
    const auth = firebase.auth()

    for (let i = 0; i < 3; i++) {
      expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST))

      expect(saga.next({ payload }).value).toEqual(
        apply(auth, auth.signInWithEmailAndPassword, [
          payload.email,
          payload.password
        ])
      )
    }

    expect(saga.next().value).toEqual(put({ type: SIGN_IN_MAX_TRIES_ERROR }))
  })

  it('should sign up', () => {
    const user = {
      email: 'test@test.com',
      password: 'random123'
    }

    const saga = signUpSaga({ payload })
    const auth = firebase.auth()

    expect(saga.next().value).toEqual(
      call(
        [auth, auth.createUserWithEmailAndPassword],
        payload.email,
        payload.password
      )
    )

    expect(saga.next(user).value).toEqual(
      put({
        type: SIGN_UP_SUCCESS,
        payload: { user }
      })
    )
  })
})

describe('Action', () => {
  it('should return SIGN_IN_REQUEST action', () => {
    const email = 'test@test.com'
    const password = 'random123'

    expect(signIn(email, password)).toEqual({
      type: SIGN_IN_REQUEST,
      payload: { email, password }
    })
  })

  it('should return SIGN_UP_REQUEST action', () => {
    const email = 'test@test.com'
    const password = 'random123'

    expect(signUp(email, password)).toEqual({
      type: SIGN_UP_REQUEST,
      payload: { email, password }
    })
  })

  it('should return SIGN_UP_REQUEST action', () => {
    const email = 'test@test.com'
    const password = 'random123'

    expect(signUp(email, password)).toEqual({
      type: SIGN_UP_REQUEST,
      payload: { email, password }
    })
  })
})

describe('Reducer', () => {
  it('should return the updated state with signed user', () => {
    const user = {
      email: 'test@test.com',
      password: 'random123'
    }

    const action = {
      type: SIGN_IN_SUCCESS,
      payload: { user }
    }

    const state = new ReducerRecord()

    expect(reducer(undefined, action)).toEqual(state.set('user', { ...user }))
  })

  it('should return default state state with signed user', () => {
    const action = { type: 'ANY_OTHER_ACTION' }

    const state = new ReducerRecord()

    expect(reducer(undefined, action)).toEqual(state)
  })
})
