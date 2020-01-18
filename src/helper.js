import {LANGUAGES, OFFLINE, ONLINE} from './constants'
import showToast from './components/Toast'

export const languageChangeEvent = (lang) => {
    localStorage.setItem("lang", LANGUAGES[lang] ? lang : "en")
    window.location.search = "lang="+lang
}


export const getParameterByName = (name, url) =>{
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


// navigator.onLine

window.addEventListener("online", () => showToast(ONLINE))
window.addEventListener("offline", () => showToast(OFFLINE))