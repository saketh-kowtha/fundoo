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
   const token = process.env.MODE !== "test" ? store.getState().user.id : "Ijx0NlEgQdSDJ2qmwJnJ8fLsWs4vLPZwGrqi8C0RdiovCH0UXgRqhT5F8Ah4s5Ji"
   if(token)
      config.headers.Authorization = token
   return config
 }, function (error) {
     
 })

export default axios