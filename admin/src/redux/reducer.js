import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import authReducer, { moduleName as authModule } from '../ducks/auth'

export default combineReducers({
  form,
  [authModule]: authReducer
})
