/**
 * @author Kowtha Saketh
 * @description user reducer
 */

import {ADD_USER, UPDATE_IMAGE} from '../constants'

const user = (state = {userList: []}, action) => {
    switch(action.type) {
       case ADD_USER:
         return {...action.user};
     
      case UPDATE_IMAGE:
        return {...state, imageUrl: action.imgPath}

      case "SET_USERS":
          return {...state, userList: action.userList}

       default:
         return state;
    }
};

export default user
