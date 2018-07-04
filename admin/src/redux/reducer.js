import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer, { moduleName as authModule } from '../ducks/auth'
import userReducer, {
  moduleName as userModule,
  CREATE_USER
} from '../ducks/user'

export default combineReducers({
  form: formReducer.plugin({
    [userModule]: (state, action) => {
      switch (action.type) {
        case CREATE_USER:
          return undefined
        default:
          return state
      }
    }
  }),
  [authModule]: authReducer
})
