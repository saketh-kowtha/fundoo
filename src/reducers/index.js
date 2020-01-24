import { combineReducers } from 'redux'

import user from './userReducer'
import title from './titleReducer'

const rootReducer = combineReducers({user, title})

export default rootReducer