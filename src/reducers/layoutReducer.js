/**
 * @author Kowtha Saketh
 * @description Layout reducer
 */

import { SET_LAYOUT_ITEM } from '../constants'

const defaultState = {
    toggle: false
}

const layout = (state = defaultState, action) => {
    switch(action.type) {
        case SET_LAYOUT_ITEM:
            return { ...state, data: action.data, loading: false};
        case 'SET_LAYOUT_ITEM_LOADING':
            return { ...state, loading: true }
        case 'TOGGLE_SIDEBAR':
            return { ...state, toggle: !state.toggle }
        case 'UPDATE_GRID':
                return {...state, grid: state.grid==="column" ? "row" : "column"}
       default:
         return state;
    }
};

export default layout
