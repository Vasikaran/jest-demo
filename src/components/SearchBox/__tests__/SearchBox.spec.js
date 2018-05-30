import expect from 'expect';
import { SearchBox } from '../SearchBox';

let getTodosBySearch = expect.createSpy();
let updateSearchMode = expect.createSpy();

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

    let expectedData = props.getTodosBySearch.calls[0].arguments[0];

    expect(expectedData).toEqual('Todo 1');
    expect(props.updateSearchMode.calls[0].arguments[0]).toBeTruthy();
  });
});
