/**
 * @author Kowtha Saketh
 * @description title reducer
 */

import {ADD_TITLE} from '../constants'


const title = (state="Fundoo", action) => {
    switch(action.type) {
       case ADD_TITLE:
         return action.title;
     
       default:
         return state;
    }
};

export default title
