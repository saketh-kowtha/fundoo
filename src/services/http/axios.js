/**
 * 
 * @author Kowtha Saketh
 * @description Axios Middle ware
 * 
 */

 import store from "../../store"

 import axios from 'axios'

 axios.interceptors.request.use(function (config) {
    const token = store.getState().user.id;
    if(token)
       config.headers.Authorization = token
    return config
 }, function (error) {
     
 })

export default axios