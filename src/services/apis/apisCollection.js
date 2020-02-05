/**
 * @author Kowtha Saketh
 * @description API Urls and Methods are stored in this file
 */

import store from "../../store"


 // HTTP Method Types 
const POST = "post"
const GET = "get"
const DELETE = "delete"

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
    },
    pinUnpinNotes: {
        method: POST,
        url: `${URL}/api/notes/pinUnpinNotes`
    },
    archiveNotes: {
        method: POST,
        url: `${URL}/api/notes/archiveNotes`
    },
    noteLabesList: { 
        method: GET,
        url: `${URL}/api/noteLabels/getNoteLabelList`
    },
    deleteLabel: {
        method: DELETE,
        url: (id) => `${URL}/api/noteLabels/${id}/deleteNoteLabel` 
    },
    updateLabel: {
        method: POST,
        url: (id) => `${URL}/api/noteLabels/${id}/updateNoteLabel` 
    },
    newLabel: {
        method: POST,
        url: `${URL}/api/noteLabels` 
    },
    changesColorNotes: {
        method: POST,
        url: `${URL}/api/notes/changesColorNotes` 
    },
    trashNotes: {
        method: POST,
        url: `${URL}/api/notes/trashNotes` 
    },
    deleteForeverNotes: {
        method: POST,
        url: `${URL}/api/notes/deleteForeverNotes` 
    },
    removeLabel: {
        method: POST,
        url: (notesId, labelId) => `${URL}/api/notes/${notesId}/addLabelToNotes/${labelId}/remove`
    },
    removeReminderNotes: {
        method: POST,
        url: `${URL}/api/notes/removeReminderNotes`
    },
    getNoteById: {
        method: GET,
        url: (id) => `${URL}/api/notes/getNotesDetail/${id}`
    },
    updateNotes: {
        method: POST,
        url :`${URL}/api/notes/updateNotes`
    }

}

export default APIS