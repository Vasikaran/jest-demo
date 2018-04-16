import React, { Component } from 'react';
import { connect } from 'react-redux';

import TodoItem from '../../components/TodoItem';
import SearchBox from '../../components/SearchBox';

import { getTodos, removeTodo } from '../../actionCreators';

import style from './TodoContainer.css';

class TodoContainer extends Component {
  constructor(props) {
    super(props);

    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(index) {
    let { removeTodo, getTodos } = this.props;
    removeTodo(index).then(() => {
      getTodos();
    });
  }

  render() {
    let { todos, filteredTodos, isSearch, removeTodo } = this.props;
    let selectedTodos = isSearch ? filteredTodos : todos;
    return (
      <div className={style.container}>
        <SearchBox />
        <div className={style.todoListParent}>
          {selectedTodos.length ? (
            selectedTodos.map((todo, index) => {
              return (
                <TodoItem
                  key={index}
                  todo={todo}
                  index={index}
                  removeTodo={this.handleRemove}
                  disableRemove={isSearch}
                />
              );
            })
          ) : (
            <TodoItem
              todo={
                isSearch
                  ? 'Search result not found!'
                  : "You haven't added a Todo until now"
              }
              index={'none'}
              disableRemove={true}
            />
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    let { getTodos } = this.props;
    getTodos();
  }
}

export default connect(
  state => {
    let { todos, isSearch, filteredTodos } = state;
    return {
      todos,
      filteredTodos: filteredTodos.todos,
      isSearch
    };
  },
  { getTodos, removeTodo }
)(TodoContainer);
