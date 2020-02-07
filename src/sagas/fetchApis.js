import { put, takeEvery, call, all, delay } from 'redux-saga/effects'


import axios from '../services/http/axios'
import APIS from '../services/apis/apisCollection'

import {SET_LAYOUT_ITEM_LOADING, SET_LAYOUT_ITEM} from '../constants'

/**
 * Notes
 */
function* getNoteList() {
    let { url } = APIS["notesList"]
    try {
        yield put({type: SET_LAYOUT_ITEM_LOADING})
        const response = yield call(axios.get, url)
        if(response && response.data && response.data.data && response.data.data.success)
            yield put({type: SET_LAYOUT_ITEM, data: response.data.data.data })
    }
    catch(err){
        console.log(err)
        yield put({type: SET_LAYOUT_ITEM, data: "Error" })
    }
}


function* getRemindersList() {
    let { url } = APIS["remindersList"]
    try {
        yield put({type: SET_LAYOUT_ITEM_LOADING})
        const response = yield call(axios.get, url)
        if(response && response.data && response.data.data && response.data.data.success)
            yield put({type: SET_LAYOUT_ITEM, data: response.data.data.data })
    }
    catch(err){
        console.log(err)
        yield put({type: "SET_LAYOUT_ITEM", data: "Error" })
    }
}


function* getArchiveList() {
    let { url } = APIS["archiveList"]
    try {
        yield put({type: "SET_LAYOUT_ITEM_LOADING"})
        const response = yield call(axios.get, url)
        if(response && response.data && response.data.data && response.data.data.success)
            yield put({type: "SET_LAYOUT_ITEM", data: response.data.data.data })
    }
    catch(err){
        console.log(err)
        yield put({type: "SET_LAYOUT_ITEM", data: "Error" })
    }
}


function* getTrashList() {
    let { url } = APIS["trashList"]
    try {
        yield put({type: "SET_LAYOUT_ITEM_LOADING"})
        const response = yield call(axios.get, url)
        if(response && response.data && response.data.data && response.data.data.success)
            yield put({type: "SET_LAYOUT_ITEM", data: response.data.data.data })
    }
    catch(err){
        console.log(err)
        yield put({type: "SET_LAYOUT_ITEM", data: "Error" })
    }
}

function* getNoteLabels() {
    let { url } = APIS["noteLabesList"]
    try {
        yield put({ type: "SET_LABELS_LOADING" })
        const response = yield call(axios.get, url)
        if(response && response.data && response.data.data && response.data.data.success)
            yield put({ type: "SET_LABELS", data: response.data.data.details })
    }
    catch(err){
        console.log(err)
        yield put({type: "SET_LABELS", data: "Error" })
    }
}

function* getLabelNotes(payLoad) {
    let { url } = APIS["getNotesByLabel"]
    try {
        yield put({ type: "SET_LAYOUT_ITEM_LOADING" })
        const response = yield call(axios.post, url(payLoad.data))
        if(response && response.data && response.data.data && response.data.data.success)
            yield put({ type: "SET_LAYOUT_ITEM", data: response.data.data.data })
    }
    catch(err){
        console.log(err)
        yield put({type: "SET_LAYOUT_ITEM", data: "Error" })
    }
}


export default function* watchFetchList() {
    yield all([ takeEvery("FETCH_NOTES", getNoteList),
                takeEvery("FETCH_REMINDERS", getRemindersList),
                takeEvery("FETCH_ARCHIVE", getArchiveList),
                takeEvery("FETCH_TRASH", getTrashList),
                takeEvery("FETCH_LABELS", getNoteLabels),
                takeEvery("FETCH_BY_LABEL", getLabelNotes)
            ])
}


