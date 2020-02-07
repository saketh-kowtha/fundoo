import showToast from '../components/Toast'
import http from '../services/http'

import {ERROR, SET_ARCHIVE_LOADING, UPDATE_ARCHIVE, FETCH_ARCHIVE} from '../constants'

import geti18N from '../strings'
import { all, call, put, takeEvery, delay } from 'redux-saga/effects'

const {somethingWrong, updatedSuccessfullyMsg} = geti18N()

function* handleArchive(payLoad){
    try{
        yield put({type: SET_ARCHIVE_LOADING})
        let response = yield call(http.archiveNotes, payLoad.data)
        if(response.data && response.data.success === true){
            showToast(updatedSuccessfullyMsg)
            yield put({type: FETCH_ARCHIVE})
        }
        else
            yield showToast(somethingWrong, ERROR)
    }
    catch(exception){
        console.log(exception)
        showToast(somethingWrong, ERROR)
    }

}


function* handleNotesChange(payLoad){
    try{
        let response = yield call(http.updateNotes, payLoad.data)
        if(response.data && response.data.success === true){
            showToast(updatedSuccessfullyMsg)
        }
        else
            yield showToast(somethingWrong, ERROR)
    }
    catch(exception){
        console.log(exception)
        showToast(somethingWrong, ERROR)       
    }
}

function* handleAddNotes(payLoad){
    try{
        let response = yield call(http.addNotes, payLoad.data)
        if(response.status && response.status.success === true){
            
            showToast(updatedSuccessfullyMsg)
        }
        else
            yield showToast(somethingWrong, ERROR)
    }
    catch(exception){
        console.log(exception)
        showToast(somethingWrong, ERROR)       
    }
}

function* handleUSerSearch(payLoad){
    try{
        let response = yield call(http.searchUserList, payLoad.data)
        if(response.data && response.data.success === true)
            yield put({type: "SET_USERS", userList: response.data.details})
    }
    catch(exception){
        console.log(exception)
    }
}

function* handleAddCollaborator(payLoad){
    try{
        let response = yield call(http.addCollaborator, payLoad.data)
        if(response.data && response.data.success === true)
            showToast("Successfully added")
        else
            showToast("Unable to add", "error")
    }
    catch(exception){
        console.log(exception)
    }
}

function* handleDeleteCollaborator(payLoad){
    try{
        let response = yield call(http.removeCollaborator, payLoad.data)
        if(response.data && response.data.success === true)
            showToast("Successfully Deleted")
        else
            showToast("Unable to Delete", "error")
    }
    catch(exception){
        console.log(exception)
    }
}

export default function* notesOperationsSaga() {
    yield all([
        takeEvery(UPDATE_ARCHIVE, handleArchive),
        takeEvery("UPDATE_NOTES", handleNotesChange),
        takeEvery("ADD_NOTES", handleAddNotes),
        takeEvery("GET_USERS", handleUSerSearch),
        takeEvery("ADD_COLLABORATOR", handleAddCollaborator),
        takeEvery("DELETE_COLLABORATOR", handleDeleteCollaborator)
    ])
}