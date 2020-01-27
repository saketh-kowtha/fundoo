/**
 * @author Kowtha Saketh
 * @description Fundoo App http calls 
 */

import axios from './axios'

import APIS from '../apis/apisCollection'
import geti18N from '../../strings'
import { SIGNUP, LOGIN, RESETPASSWORD } from '../../constants'


const {inCorrectPasswd, invalidEmail, imageUpdated, somethingWrong, authRequired, invalidFile} = geti18N()
const http = {}

/**
 * @name Signup 
 * @description Signup API
 * @param{1} Payload Data for API
 * @param{2} API callback
 */
http.signUp = (data, cb) => {
    let payLoad = {}
    payLoad.firstName = data.firstname.value
    payLoad.lastName = data.lastname.value
    payLoad.password = data.password.value
    payLoad.email = data.email.value
    payLoad.service = "advance"
    let {url, method} = APIS[SIGNUP]
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

/**
 * @name login 
 * @description login API
 * @param{1} Payload Data for API
 * @param{2} API callback
 */
http.login = (data, cb) => {
    let payLoad = {}
    payLoad.password = data.password.value
    payLoad.username = data.username.value
    let {url, method} = APIS[LOGIN]
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
            let error = (errorResponse && errorResponse.response && errorResponse.response.status) 
            if (error && error == 401) {
                cb(inCorrectPasswd, null)
            }
    })
}

/**
 * @name forgotPassword 
 * @description forgotPassword API
 * @param{1} Payload Data for API
 * @param{2} API callback
 */
http.forgotPassword = (data, cb) => {
    let payLoad = {}
    payLoad.email = data.email.value
    let {url, method} = APIS[RESETPASSWORD]
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
            cb(invalidEmail, null)
        }
    })
}

http.signOut = (cb) => {
    let {url, method} = APIS['signOut']
    axios({
        method,
        url,
    })
        .then(successResponse => {
            if(successResponse.status === 204)
            cb("OK")
        })
        .catch(errorResponse => {
        cb(null)
         })
}

http.updateProfilePic = (data, cb) => {
    let {url, method} = APIS['changeProfilePic']
    axios({
        method,
        url,
        data
    })
        .then(successResponse => {
            if (successResponse && successResponse.data && successResponse.data.status && successResponse.data.status.success) {
                cb(imageUpdated, successResponse.data.status.imageUrl)
            }
            else
                cb(somethingWrong)
        })
        .catch(errorResponse => {
            if (errorResponse && errorResponse.response && errorResponse.response.data && errorResponse.response.data.error) {
                const error = errorResponse.response.data.error
                if (error && error.statusCode === 401) {
                    cb(authRequired)                
                }
                else if (error && error.statusCode === 500) {
                    cb(invalidFile)
                }
            }
         })
}

export default http

