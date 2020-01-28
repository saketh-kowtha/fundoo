import { put, takeEvery, call, all, delay } from 'redux-saga/effects'


import axios from '../services/http/axios'
import APIS from '../services/apis/apisCollection'


function* helloSaga() {
    console.log('Hello Sagas!')
}

/**
 * Notes
 */
function* getNoteList() {
    let { url, method } = APIS["notesList"]
    try {
        yield put({ type: "SET_LAYOUT_ITEM_LOADING", loading: true })
        const response = yield call(axios.get, url)
        if(response && response.data && response.data.data && response.data.data.success)
            yield put({type: "SET_LAYOUT_ITEM", data: response.data.data.data })
    }
    catch(err){
        console.log(err)
        yield put({type: "SET_LAYOUT_ITEM", data: "Error" })
    }
}


function* getRemindersList() {
    let { url, method } = APIS["remindersList"]
    try {
        const response = yield call(axios.get, url)
        if(response && response.data && response.data.data && response.data.data.success)
            yield put({type: "SET_LAYOUT_ITEM", data: response.data.data.data })
    }
    catch(err){
        console.log(err)
        yield put({type: "SET_LAYOUT_ITEM", data: "Error" })
    }
}


function* getArchiveList() {
    let { url, method } = APIS["archiveList"]
    try {
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
    let { url, method } = APIS["trashList"]
    try {
        const response = yield call(axios.get, url)
        if(response && response.data && response.data.data && response.data.data.success)
            yield put({type: "SET_LAYOUT_ITEM", data: response.data.data.data })
    }
    catch(err){
        console.log(err)
        yield put({type: "SET_LAYOUT_ITEM", data: "Error" })
    }
}


function* watchFetchList() {
    yield all([ takeEvery("FETCH_NOTES", getNoteList),
                takeEvery("FETCH_REMINDERS", getRemindersList),
                takeEvery("FETCH_ARCHIVE", getArchiveList),
                takeEvery("FETCH_TRASH", getTrashList)
            ])
}




export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchFetchList()
    ])
}