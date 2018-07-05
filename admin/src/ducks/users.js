import { appName } from '../config'
import { Map, List } from 'immutable'

/**
 * Constants
 * */
export const moduleName = 'users'
const prefix = `${appName}/${moduleName}`

export const USER_ADD_SUCCESS = `${prefix}/USER_ADD_SUCCESS`

/**
 * Reducer
 * */
const initialState = List()

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case USER_ADD_SUCCESS:
      return state.push(Map(payload.user))
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

export function addUser(user) {
  return (dispatch) => {
    dispatch({
      type: USER_ADD_SUCCESS,
      payload: { user }
    })
  }
}
