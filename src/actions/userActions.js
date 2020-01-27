
/**
 * 
 * @author Kowtha Saketh
 * @description user redux actions
 * 
 */

import {ADD_USER, UPDATE_IMAGE} from '../constants'

/**
 * 
 * @name addUser
 * @description Add user redux action
 * 
 */

export const addUser = (user) => ({
    type: ADD_USER,
    user
})



/**
 * 
 * @name updateImage
 * @description Update Image redux action
 * 
 */

export const updateImage = (imgPath) => ({
    type: UPDATE_IMAGE,
    imgPath
})

