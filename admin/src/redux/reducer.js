import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import authReducer, { moduleName as authModule } from '../ducks/auth'
import usersReducer, { moduleName as addModule } from '../ducks/users'

export default combineReducers({
  form,
  [authModule]: authReducer,
  [addModule]: usersReducer
})
