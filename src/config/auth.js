
export const isAuthenticated = () => {
    const state = JSON.parse(sessionStorage.getItem("state")) || {}
    const user = state.user || {}
    if(user.id)
        return true
}