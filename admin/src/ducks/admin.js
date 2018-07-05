import { appName } from '../config'
import { Record } from 'immutable'
import firebase from 'firebase/app'

/**
 * Constants
 * */
export const moduleName = 'admin'
const prefix = `${appName}/${moduleName}`

export const ADD_USER_SUCCESS = `${prefix}/ADD_USER_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  newUser: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_USER_SUCCESS:
      return state.set('newUser', payload.newUser)

    default:
      return state
  }
}

/**
 * Selectors
 * */

/**
 * Action Creators
 * */

export function addUser(firstName, lastName, email) {
  return (dispatch) => {
    dispatch({
      type: ADD_USER_SUCCESS,
      payload: { newUser: { firstName, lastName, email } }
    })
  }
}

firebase.auth().onAuthStateChanged((user) => {
  window.store.dispatch({
    type: ADD_USER_SUCCESS,
    payload: { newUser: {} }
  })
})
