/**
 * 
 * @author Kowtha Saketh
 * @description Axios Middle ware
 * 
 */

 import axios from 'axios'

 axios.interceptors.request.use(function (config) {
     console.log("STOPPED")
     return config
 }, function(error) {
     
 })