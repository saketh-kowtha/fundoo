/**
 * @author Kowtha Saketh
 * @description user reducer
 */

import {ADD_USER, UPDATE_IMAGE} from '../constants'

const user = (state = {}, action) => {
    switch(action.type) {
       case ADD_USER:
         return {...action.user};
     
      case UPDATE_IMAGE:
        console.log({ ...state })
        return {...state, imageUrl: action.imgPath}
       default:
         return state;
    }
};

export default user
