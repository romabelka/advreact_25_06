import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import authReducer, { moduleName as authModule } from '../ducks/auth'
import personsReducer, { moduleName as personsModule } from '../ducks/persons'

export default combineReducers({
  form,
  [authModule]: authReducer,
  [personsModule]: personsReducer
})
