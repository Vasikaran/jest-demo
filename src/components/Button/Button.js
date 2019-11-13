import React, { Component } from 'react';

import style from './Button.css';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { onClick, name } = this.props;
    return (
      <span onClick={onClick} className={style.button} data-id={'button'}>
        {name}
      </span>
    );
  }
}
