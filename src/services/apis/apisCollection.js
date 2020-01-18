const POST = "post"
const GET = "get"

const APIS = {
    signUp: {
        method: POST,
        url: "http://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp"
    },
    login: {
        method: POST,
        url: "http://fundoonotes.incubation.bridgelabz.com/api/user/login"
    },
    reset: {
        method: POST,
        url:"http://fundoonotes.incubation.bridgelabz.com/api/user/reset"
    }
}

export default APIS