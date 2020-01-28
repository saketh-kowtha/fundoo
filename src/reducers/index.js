import { combineReducers } from 'redux'

import user from './userReducer'
import title from './titleReducer'
import layout from './layoutReducer'

const rootReducer = combineReducers({user, title, layout})

export default rootReducer