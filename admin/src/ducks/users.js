import { appName } from '../config'
import { Record } from 'immutable'

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
  users: []
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action
  switch (type) {
    case ADD_USER:
      return state.updateIn(['users'], (arr) => arr.concat([payload]))

    default:
      return state
  }
}

/**
 * Action Creators
 * */

export function addUser(values) {
  return (dispatch) => {
    dispatch({
      type: ADD_USER,
      payload: { ...values }
    })
  }
}
