import { combineReducers } from 'redux'

import user from './userReducer'
import title from './titleReducer'
import layout from './layoutReducer'
import label from './labelReducers'

const rootReducer = combineReducers({user, title, layout, label})

export default rootReducer