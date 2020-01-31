import { put, takeEvery, call, all, delay } from 'redux-saga/effects'


import axios from '../services/http/axios'
import APIS from '../services/apis/apisCollection'

export default function* watchLabelActions() {
    yield all([ 
                takeEvery("ADD_LABEL")
            ])
}


