import { combineReducers } from 'redux'

import user from './userReducer'
import title from './titleReducer'
import layout from './layoutReducer'
import label from './labelReducers'
import notes from './notesReducer.js'

const rootReducer = combineReducers({user, title, layout, label, notes})

export default rootReducer