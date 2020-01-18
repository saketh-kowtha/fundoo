import axios from 'axios'

import APIS from '../apis/apisCollection'

const http = {}

http.signUp = (data, cb) => {
    let payLoad = {}
    payLoad.firstName = data.firstname.value
    payLoad.lastName = data.lastname.value
    payLoad.password = data.password.value
    payLoad.email = data.email.value
    payLoad.service = "advance"
    let {url, method} = APIS["signUp"]
    axios({
            method,
            url,
            data: payLoad
    })
    .then(successResponse => {
        if(successResponse && successResponse.data && successResponse.data.data && successResponse.data.data.success === true && successResponse.data.data.message)
            cb(null,successResponse.data.data.message)
    })
    .catch(errorResponse => {
        let error = (errorResponse && errorResponse.response && errorResponse.response.data && errorResponse.response.data.error) || null
        if(error  && error.name === "ValidationError" && error.details && error.details.messages && typeof error.details.messages  === "object"){
            const errorFeilds = Object.keys(error.details.messages).filter(e => e != "username")
            const errors = {}
            errorFeilds.forEach(e => errors[(e||"").toLocaleLowerCase()] = error.details.messages[e])
            cb(errors, null)
        }
    })
}


http.login = (data, cb) => {
    let payLoad = {}
    payLoad.password = data.password.value
    payLoad.username = data.username.value
    let {url, method} = APIS["login"]
    axios({
            method,
            url,
            data: payLoad
    })
    .then(successResponse => {
        if(successResponse && successResponse.data.id)
            cb(null,successResponse.data)
    })
    .catch(errorResponse => {
        let error = (errorResponse && errorResponse.response && errorResponse.response.data && errorResponse.response.data.error) || null
        if(error  && error.name === "Error" && error.statusCode === 401){
            cb("Invalid Credintails", null)
        }
    })
}


http.forgotPassword = (data, cb) => {
    let payLoad = {}
    payLoad.email = data.email.value
    let {url, method} = APIS["reset"]
    axios({
            method,
            url,
            data: payLoad
    })
    .then(successResponse => {
        if(successResponse && successResponse.data.success === true)
            cb(null,successResponse.data.message)
    })
    .catch(errorResponse => {
        let error = (errorResponse && errorResponse.response && errorResponse.response.data && errorResponse.response.data.error) || null
        if(error  && error.name === "Error" && error.statusCode === 404){
            cb("Invalid Email", null)
        }
    })
}



export default http

