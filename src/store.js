import { createStore, applyMiddleware } from 'redux'

import rootReducer from './reducers'

import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas'

import { composeWithDevTools } from 'redux-devtools-extension'

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

const store = createStore(rootReducer, persistedState, composeWithDevTools(applyMiddleware(sagaMiddleWare)))


store.subscribe(() => {
    saveState(store.getState());
}); 


sagaMiddleWare.run(rootSaga) 

export const action = (type) => store.dispatch({type})

export default store