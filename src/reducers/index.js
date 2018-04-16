import * as constants from '../constants';

export let todos = (state = [], action) => {
  let { type, data } = action;
  switch (type) {
    case constants.ADD_TODO:
      return [...state, data];
    case constants.REMOVE_TODO:
      return state.slice().splice(data, 1);
    case constants.UPDATE_TODOS:
      return data;
    default:
      return state;
  }
};

export let filteredTodos = (state = [], action) => {
  let { type, data } = action;
  switch (type) {
    case constants.UPDATE_FILTERED_TODOS:
      return {
        isFetching: false,
        todos: data
      };
    case constants.FAILURE_FILTERED_TODOS:
      return {
        isFetching: true,
        todos: []
      };
    default:
      return state;
  }
};

export let isSearch = (state = false, action) => {
  let { type, data } = action;
  switch (type) {
    case constants.UPDATE_SEARCH_MODE:
      return data;
    default:
      return state;
  }
};
