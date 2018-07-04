import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'

/**
 * Constants
 * */
export const moduleName = 'user'
const prefix = `${appName}/${moduleName}`

export const CREATE_USER = `${prefix}/CREATE_USER`

/**
 * Reducer
 * */
export const ReducerList = Record({
  users: OrderedMap({})
})

export default function reducer(state = new ReducerList(), action) {
  const { type, payload } = action

  switch (type) {
    case CREATE_USER:
      return state.setIn(['users', payload.email], payload)

    default:
      return state
  }
}

/**
 * Action Creators
 * */
export function createUser(firstName, lastName, email) {
  return {
    type: CREATE_USER,
    payload: {
      firstName,
      lastName,
      email
    }
  }
}
