
/**
 * 
 * @author Kowtha Saketh
 * @description Navbar redux actions
 * 
 */

import {ADD_TITLE} from '../constants'

/**
 * 
 * @name modifyTitle
 * @description Add title redux action
 * 
 */

export const modifyTitle = (title) => ({
    type: ADD_TITLE,
    title
})

