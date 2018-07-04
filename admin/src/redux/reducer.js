import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import authReducer, { moduleName as authModule } from '../ducks/auth'
import personReducer, {
  moduleName as personModule,
  ADD_PERSON_SUCCESS
} from '../ducks/persons'

export default combineReducers({
  form: form.plugin({
    'add-person': (state, action) => {
      switch (action.type) {
        case ADD_PERSON_SUCCESS:
          return undefined
        default:
          return state
      }
    }
  }),
  [authModule]: authReducer,
  [personModule]: personReducer
})
