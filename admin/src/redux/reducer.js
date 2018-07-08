import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import authReducer, { moduleName as authModule } from '../ducks/auth'
import eventsReducer, { moduleName as eventsModule } from '../ducks/events'
import peopleReducer, { moduleName as peopleModule } from '../ducks/people'

export default combineReducers({
  form,
  [authModule]: authReducer,
  [eventsModule]: eventsReducer,
  [peopleModule]: peopleReducer
})
