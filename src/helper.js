/**
 * @author Kowtha Saketh
 * @description Fundoo helper functions 
 */
import {LANGUAGES, OFFLINE, ONLINE} from './constants'
import showToast from './components/Toast'

/**
 * @name languageChangeEvent
 * @param {string} lang 
 * @description language selection handler
 */
export const languageChangeEvent = (lang) => {
    localStorage.setItem("lang", LANGUAGES[lang] ? lang : "en")
    window.location.search = "lang="+lang
}

/**
 * @name getParameterByName
 * @param {string} name 
 * @param {string} url
 * @description language selection handler
 */
export const getParameterByName = (name, url) =>{
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


//Network Status event for Online
window.addEventListener("online", () => showToast(ONLINE))

//Network Status event for Offline
window.addEventListener("offline", () => showToast(OFFLINE))