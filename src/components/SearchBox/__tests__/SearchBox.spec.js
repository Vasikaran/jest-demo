import expect from 'expect';
import { SearchBox } from '../index';

let getTodosBySearch = expect.createSpy();
let updateSearchMode = expect.createSpy();

describe('SearchBox', () => {
  let defaultProps = {
    isSearch: true,
    getTodosBySearch,
    updateSearchMode
  };

  let { props, renderedDOM: searchBoxDOM } = setup(SearchBox, defaultProps);

  it('SearchBox rendered or not', () => {
    let searchBox = global.TestUtils.findRenderedComponentsWithTestid(
      searchBoxDOM,
      'searchBox'
    );
    expect(global.TestUtils.isDOMComponent(searchBox)).toBeTruthy();
  });

  it('Input box change handler called or not', () => {
    let searchInput = global.TestUtils.findRenderedComponentsWithTestid(
      searchBoxDOM,
      'searchInput'
    );

    global.TestUtils.Simulate.change(searchInput);
    expect(props.getTodosBySearch.calls.length).toEqual(1);
  });
});
