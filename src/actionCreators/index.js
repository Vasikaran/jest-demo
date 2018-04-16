import { RequestAPI } from '../utils';
import * as constants from '../constants';

export let getTodos = () => {
  return {
    types: [
      constants.FETCHING_TODOS,
      constants.UPDATE_TODOS,
      constants.FAILURE_TODOS
    ],
    shouldCallAPI: () => true,
    callAPI: () => {
      return RequestAPI('/api/v1/todos', 'GET');
    }
  };
};

export let getTodosBySearch = searchString => {
  return {
    types: [
      constants.FETCHING_FILTERED_TODOS,
      constants.UPDATE_FILTERED_TODOS,
      constants.FAILURE_FILTERED_TODOS
    ],
    shouldCallAPI: () => true,
    callAPI: () => {
      let query = `searchString=${searchString}`;
      return RequestAPI('/api/v1/getFilteredTodos', 'GET', null, query);
    }
  };
};

export let updateSearchMode = isSearch => {
  return {
    type: constants.UPDATE_SEARCH_MODE,
    data: isSearch
  };
};

export let addTodo = todo => {
  return {
    types: [
      constants.FETCHING_ADD_TODO,
      constants.SUCCESS_ADD_TODO,
      constants.FAILURE_ADD_TODO
    ],
    shouldCallAPI: () => true,
    callAPI: () => {
      return RequestAPI('/api/v1/addTodo', 'POST', { todo });
    }
  };
};

export let removeTodo = index => {
  return {
    types: [
      constants.FETCHING_REMOVE_TODO,
      constants.SUCCESS_REMOVE_TODO,
      constants.FAILURE_REMOVE_TODO
    ],
    shouldCallAPI: () => true,
    callAPI: () => {
      return RequestAPI('/api/v1/removeTodo', 'POST', { todoIndex: index });
    }
  };
};
