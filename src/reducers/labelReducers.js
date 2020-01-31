
const label = (state = {}, action) => {
    switch (action.type) {
        case "SET_LABELS":
            return { data: [...action.data ], loading: false }
        case "SET_LABELS_LOADING":
            return { loading: true }
        default:
            return state
    }
}

export default label