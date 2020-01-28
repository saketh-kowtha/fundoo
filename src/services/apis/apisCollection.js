/**
 * @author Kowtha Saketh
 * @description API Urls and Methods are stored in this file
 */

import store from "../../store"


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
    },
    signOut: {
        method: POST,
        url: `${URL}/api/user/logout`
    },
    changeProfilePic: {
        method: POST,
        url: `${URL}/api/user/uploadProfileImage`
    },
    notesList: {
        method: GET,
        url: `${URL}/api/notes/getNotesList`
    },
    remindersList: {
        method: GET,
        url: `${URL}/api/notes/getReminderNotesList`
    },
    archiveList: {
        method: GET,
        url: `${URL}/api/notes/getArchiveNotesList`
    },
    trashList: {
        method: GET,
        url: `${URL}/api/notes/getTrashNotesList`
    }
}

export default APIS