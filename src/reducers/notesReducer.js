/**
 * @author Kowtha Saketh
 * @description Layout reducer
 */

import { SET_LAYOUT_ITEM, SET_LAYOUT_ITEM_LOADING } from '../constants'



const notes = (state = {}, action) => {
    switch(action.type) {
        case SET_LAYOUT_ITEM:
            return { ...state, data: action.data, loading: false};
        case SET_LAYOUT_ITEM_LOADING:
            return { ...state, loading: true }
            
        default:
            return state;
    }
};

export default notes
