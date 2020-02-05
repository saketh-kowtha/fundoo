import watchFetchList from './fetchApis'

import notesOperationsSaga from './notesOperations'

import {all} from 'redux-saga/effects'



export default function* rootSaga() {
    yield all([
        watchFetchList(),
        notesOperationsSaga()
    ])
}