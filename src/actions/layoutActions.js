import {TOGGLE_SIDEBAR, UPDATE_GRID} from '../constants'
export const toggleSidebar = () => {
    return {
        type: TOGGLE_SIDEBAR
    }
}

export const gridView = () => {
    return {
        type: UPDATE_GRID
    }
}