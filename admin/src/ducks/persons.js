import { appName } from '../config'
import { Record } from 'immutable'
import { reset } from 'redux-form'

/**
 * Constants
 * */
export const moduleName = 'persons'
const prefix = `${appName}/${moduleName}`

export const ADD_USER = `${prefix}/ADD_USER`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  person: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_USER:
      return state.set('person', payload.person)

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
      type: ADD_USER,
      payload: { person: { firstName, lastName, email } }
    })
    dispatch(reset('addUser'))
  }
}
