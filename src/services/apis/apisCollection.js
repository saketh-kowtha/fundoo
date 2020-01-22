/**
 * @author Kowtha Saketh
 * @description API Urls and Methods are stored in this file
 */


 // HTTP Method Types 
const POST = "post"
const GET = "get"
const URL = "http://fundoonotes.incubation.bridgelabz.com"
//API end point URl's
const APIS = {
    signUp: {
        method: POST,
        url: `${URL}/api/user/userSignUp`
    },
    login: {
        method: POST,
        url: `${URL}/api/user/login`
    },
    reset: {
        method: POST,
        url: `${URL}/api/user/reset`
    }
}

export default APIS