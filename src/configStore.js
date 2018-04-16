import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';

import { PromiseMiddleware } from './middlewares';
import * as reducers from './reducers';

let initialState = {
  todos: [],
  filteredTodos: {
    isFetching: false,
    todos: []
  },
  isSearch: false
};

let enhancer = applyMiddleware(PromiseMiddleware);

let combinedReducers = combineReducers(reducers);

let createStoreWithMiddleware = compose(enhancer)(createStore);

let store = createStoreWithMiddleware(combinedReducers, initialState);

export default store;
