/**
 * @author Kowtha Saketh
 * @description Layout reducer
 */

import { SET_LAYOUT_ITEM } from '../constants'

const layout = (state = {toggle: false}, action) => {
    switch(action.type) {
        case SET_LAYOUT_ITEM:
            return { ...state, ...action.data};
        case 'SET_LAYOUT_ITEM_LOADING':
            return { ...state, loading: true }
        case 'TOGGLE_SIDEBAR':
            return {toggle: !state.layout.toggle}
       default:
         return state;
    }
};

export default layout
