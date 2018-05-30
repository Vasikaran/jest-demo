import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import store from './configStore';
import TodoContainer from './containers/TodoContainer/TodoContainer';

import style from './app.css';

class TodoApp extends Component {
  render() {
    return (
      <div className={style.containerParent}>
        <TodoContainer />
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('target')
);
