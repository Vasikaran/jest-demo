import Button from '../Button';
import expect from 'expect';

let onClickHandler = expect.createSpy();

describe(`Button's unit test cases`, () => {
  let { renderedDOM, props } = global.setup(Button, {
    onClick: onClickHandler,
    name: 'Remove'
  });

  let button = global.TestUtils.findRenderedComponentsWithTestid(
    renderedDOM,
    'button'
  );

  it(`Check whether button mounted or not`, () => {
    expect(global.TestUtils.isDOMComponent(button)).toBeTruthy();
  });

  it('Check name prop correctly render or not', () => {
    let value = button.innerHTML;
    expect(value).toEqual('Remove');
  });

  it(`Check on click handler invoked or not`, () => {
    global.TestUtils.Simulate.click(button);
    expect(props.onClick.calls.length).toEqual(1);
  });
});
