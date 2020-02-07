/**
 * @author Kowtha Saketh
 * @description Layout reducer
 */

 import {UPDATE_GRID, TOGGLE_SIDEBAR} from './../constants'

const defaultState = {
    toggle: true,
}

const layout = (state = defaultState, action) => {
    switch(action.type) {
        case TOGGLE_SIDEBAR:
            return { ...state, toggle: !state.toggle }
        case UPDATE_GRID:
                return {...state, grid: state.grid==="column" ? "row" : "column"} 
        default:
            return state;
    }
};

export default layout
