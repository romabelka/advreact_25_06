import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import authReducer, { moduleName as authModule } from '../ducks/auth'
import peopleReducer, { moduleName as peopleModule } from '../ducks/people'

export default combineReducers({
  form,
  [authModule]: authReducer,
  [peopleModule]: peopleReducer
})
