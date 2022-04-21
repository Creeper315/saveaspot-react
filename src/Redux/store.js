import postReducer from './Reducer/postReducer';

import { combineReducers, createStore } from 'redux';

const allReducer = combineReducers({
    postReducer,
});

const store = createStore(allReducer);

export default store;
