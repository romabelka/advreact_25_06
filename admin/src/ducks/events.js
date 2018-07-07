import { Record, List } from 'immutable'

// Constants
export const moduleName = 'events'
export const GET_EVENTS_REQUEST = 'GET_EVENTS_REQUEST'
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS'
export const GET_EVENTS_ERROR = 'GET_EVENTS_ERROR'

// Reducer
// const ReducerState = Record({
//   events: new List([]),
//   fetching: false
// })
//
// const EventRecord = Record({
//   title: null,
//   url: null,
//   where: null,
//   when: null,
//   month: null,
//   submissionDeadline: null
// })

const initialState = {
  entities: [],
  fetching: false
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_EVENTS_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        entities: payload,
        fetching: false
      }
    case GET_EVENTS_ERROR:
      return {
        ...state,
        fetching: false
      }
    default:
      return state
  }
}

// Action Creators
export const getEvents = () => ({
  type: GET_EVENTS_REQUEST
})
