import { createStore } from 'redux'

import rootReducer from './reducers'


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


const store = createStore(rootReducer, persistedState)

const saveState = (data) => {
    try {

        const serializedState = JSON.stringify(data);
        sessionStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};
  
store.subscribe(() => {
    saveState(store.getState());
}); 





export default store