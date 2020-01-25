import { createStore, applyMiddleware } from 'redux'

import rootReducer from './reducers'

import createSagaMiddleware from 'redux-saga';

import {helloSaga} from './sagas'

const loadState = () => {
    try {
      const serializedState = sessionStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  }; 


const persistedState = loadState();

const sagaMiddleWare = createSagaMiddleware()


const saveState = (data) => {
    try {
        const serializedState = JSON.stringify(data);
        sessionStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};

const store = createStore(rootReducer, persistedState, applyMiddleware(sagaMiddleWare))

sagaMiddleWare.run(helloSaga) 

store.subscribe(() => {
    saveState(store.getState());
}); 




export default store