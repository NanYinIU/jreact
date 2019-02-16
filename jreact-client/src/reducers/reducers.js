
import { combineReducers } from 'redux'
import { authentication} from "./auth.reducer";
import { registration } from "./registration.reducer";
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    authentication,
    registration,
    form:formReducer
})
