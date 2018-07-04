import { appName } from '../config'
import { Record } from 'immutable'

/**
 * Constants
 * */
export const moduleName = 'persons'
const prefix = `${appName}/${moduleName}`

export const ADD_PERSON = `${prefix}/ADD_PERSON`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  items: []
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_PERSON:
      return state.update('items', (persons) => persons.concat([payload]))

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

export const addPerson = ({ firstName, lastName, email }) => (dispatch) => {
  dispatch({
    type: ADD_PERSON,
    payload: { firstName, lastName, email }
  })

  dispatch({
    type: ADD_PERSON_SUCCESS,
    payload: { firstName, lastName, email }
  })
}
