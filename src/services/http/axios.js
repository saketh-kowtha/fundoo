/**
 * 
 * @author Kowtha Saketh
 * @description Axios Middle ware
 * 
 */

 import store from "../../store"

 import axios from 'axios'

 import showToast from '../../components/Toast'

 axios.interceptors.request.use(function (config) {
    if (!navigator.onLine)
      return showToast("No Internet Connection")
   const token = store.getState().user.id;
   if(token)
      config.headers.Authorization = token
   return config
 }, function (error) {
     
 })

export default axios