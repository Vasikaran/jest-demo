import React, { Component } from 'react';

import Button from '../Button/Button';
import style from './TodoItem.css';

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleHover() {
    this.setState({
      isShow: true
    });
  }

  handleMouseLeave() {
    this.setState({
      isShow: false
    });
  }

  handleClick() {
    let { index, removeTodo } = this.props;
    removeTodo(index);
  }

  render() {
    let { todo, disableRemove, index } = this.props;
    let { isShow } = this.state;
    return (
      <div
        className={style.todoListOpt}
        onMouseOver={this.handleHover}
        onMouseLeave={this.handleMouseLeave}
        data-testid={'todoItem'}
      >
        <span className={style.todo}>
          {index !== 'none' ? `${index + 1}. ${todo}` : todo}
        </span>
        {isShow &&
          !disableRemove && (
            <Button onClick={this.handleClick} name={'Remove'} />
          )}
      </div>
    );
  }
}
