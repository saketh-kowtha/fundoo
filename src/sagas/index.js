import watchFetchList from './fetchApis'
import {all} from 'redux-saga/effects'



export default function* rootSaga() {
    yield all([
        watchFetchList()
    ])
}