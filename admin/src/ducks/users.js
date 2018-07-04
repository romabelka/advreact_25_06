import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'
import { reset } from 'redux-form'

/**
 * Constants
 * */

export const moduleName = 'users'
const prefix = `${appName}/${moduleName}`

export const ADD_USER = `${prefix}/ADD_USER`

/**
 * Reducer
 * */

export const ReducerRecord = Record({
  values: new OrderedMap({})
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_USER:
      return state.setIn(['values', payload.email], payload)

    default:
      return state
  }
}

/**
 * Selectors
 * */

export const getUsers = (state) => state[moduleName].values.toArray()

/**
 * Action Creators
 * */

export function addUser(firstName, lastName, email) {
  return (dispatch) => {
    dispatch({
      type: ADD_USER,
      payload: {
        firstName,
        lastName,
        email
      }
    })

    dispatch(reset('add-user'))
  }
}
