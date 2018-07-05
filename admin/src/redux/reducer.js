import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import authReducer, { moduleName as authModule } from '../ducks/auth'
import adminReducer, { moduleName as adminModule } from '../ducks/admin'

export default combineReducers({
  form,
  [authModule]: authReducer,
  [adminModule]: adminReducer
})
