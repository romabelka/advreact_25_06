import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import authReducer, { moduleName as authModule } from '../ducks/auth'
import peopleReducer, { moduleName as peopleModule } from '../ducks/people'
import EventReducer, { moduleName as eventModule } from '../ducks/event'

export default combineReducers({
  form,
  [authModule]: authReducer,
  [peopleModule]: peopleReducer,
  [eventModule]: EventReducer
})
