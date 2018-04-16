import nock from 'nock';
import createStore from 'redux-mock-store';

import * as actionCreators from '../index';
import * as constants from '../../constants';

import { PromiseMiddleware } from '../../middlewares';

let mockStore = createStore([PromiseMiddleware]);
let nockApi = nock('https://todo.com');

describe('Action Creators', () => {
  xit('updateSearchMode AC test', () => {
    let expectedOutput = {
      type: constants.UPDATE_SEARCH_MODE,
      data: true
    };

    expect(actionCreators.updateSearchMode(true)).toEqual(expectedOutput);
  });

  it('getTodos AC test', () => {
    let store = mockStore({});
    let actualData = ['My first Todo'];

    nockApi.get('/api/v1/todos').reply(200, actualData);

    return store.dispatch(actionCreators.getTodos()).then(res => {
      expect(store.getActions()[1].data).toEqual(actualData);
    });
  });
});
