import TodoItem from '../TodoItem';
import expect from 'expect';
import jest from 'jest-mock';

let removeTodo = jest.fn();

describe('TodoItem\'s unit test cases', () => {
  let { renderedDOM, props } = global.setup(TodoItem, {
    index: 1,
    todo: 'Todo 1',
    disableRemove: false,
    removeTodo
  });

  let todoItem = global.TestUtils.findRenderedComponentsWithTestid(
    renderedDOM,
    'todoItem'
  );

  it('Check whether todoItem mounted or not', () => {
    expect(global.TestUtils.isDOMComponent(todoItem)).toBeTruthy();
  });

  it('Check the remove button rendered or not when state changes', () => {
    let removeButtons = global.TestUtils.scryRenderedComponentsWithTestid(
      renderedDOM,
      'button'
    );

    expect(removeButtons.length).toBe(0);

    global.TestUtils.Simulate.mouseOver(todoItem);

    let removeButton = global.TestUtils.findRenderedComponentsWithTestid(
      renderedDOM,
      'button'
    );

    expect(global.TestUtils.isDOMComponent(removeButton)).toBeTruthy();
  });

  it('Check remove todo function invoked or not', () => {
    let removeButton = global.TestUtils.findRenderedComponentsWithTestid(
      renderedDOM,
      'button'
    );

    global.TestUtils.Simulate.click(removeButton);

    let [[todoIndex]] = props.removeTodo.mock.calls;

    expect(todoIndex).toBe(1);
  });

  it('Check remove button whether rendered or not when disable remove button', () => {
    let { renderedDOM, props } = global.setup(TodoItem, {
      index: 1,
      todo: 'Todo 1',
      disableRemove: true,
      removeTodo
    });

    let todoItem = global.TestUtils.findRenderedComponentsWithTestid(
      renderedDOM,
      'todoItem'
    );

    global.TestUtils.Simulate.mouseOver(todoItem);

    let removeButtons = global.TestUtils.scryRenderedComponentsWithTestid(
      renderedDOM,
      'button'
    );

    expect(removeButtons.length).toBe(0);
  });
});
