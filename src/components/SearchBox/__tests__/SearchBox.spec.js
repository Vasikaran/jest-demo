import expect from 'expect';
import { SearchBox } from '../SearchBox';
import jest from 'jest-mock';

let getTodosBySearch = jest.fn();
let updateSearchMode = jest.fn();

describe('SearchBox', () => {
  let defaultProps = {
    isSearch: true,
    getTodosBySearch,
    updateSearchMode
  };

  let { props, renderedDOM: searchBoxDOM } = setup(SearchBox, defaultProps);

  let searchBox = global.TestUtils.findRenderedComponentsWithTestid(
    searchBoxDOM,
    'searchBox'
  );

  it('SearchBox rendered or not', () => {
    expect(global.TestUtils.isDOMComponent(searchBox)).toBeTruthy();
  });

  it('Input box change handler called or not', () => {
    let searchInput = global.TestUtils.findRenderedComponentsWithTestid(
      searchBoxDOM,
      'searchInput'
    );

    global.TestUtils.Simulate.change(searchInput, {
      target: { value: 'Todo 1' }
    });

    let [[expectedData]] = props.getTodosBySearch.mock.calls;

    expect(expectedData).toEqual('Todo 1');

    let [[data]] = props.updateSearchMode.mock.calls;

    expect(data).toBeTruthy();
  });
});
