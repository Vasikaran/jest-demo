import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getTodosBySearch,
  updateSearchMode,
  addTodo,
  getTodos
} from '../../actionCreators';

import style from './SearchBox.css';

export class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.disableSearchMode = this.disableSearchMode.bind(this);
  }

  handleChange(event) {
    let { value } = event.target;
    let { getTodosBySearch, updateSearchMode } = this.props;
    this.setState(
      {
        searchString: value
      },
      () => {
        let { searchString, isSearch } = this.state;
        updateSearchMode(true);
        getTodosBySearch(searchString);
      }
    );
  }

  handleAddTodo(event = false, todo) {
    event && event.stopPropagation();
    let { addTodo, getTodos } = this.props;
    let { searchString } = this.state;
    addTodo(todo ? todo : searchString).then(() => {
      getTodos();
    });
  }

  render() {
    let { searchString } = this.state;
    return (
      <div className={style.inputBox} data-testid={'searchBox'}>
        <input
          data-testid={'searchInput'}
          className={style.input}
          type={'text'}
          placeholder={'Search Todos'}
          onChange={this.handleChange}
          value={searchString}
        />
        <span onClick={this.handleAddTodo} data-testid={'addTodo'}>
          <b className={style.addSpan}>+</b>
        </span>
      </div>
    );
  }

  disableSearchMode(event) {
    let { keyCode, type } = event;
    let { updateSearchMode, isSearch } = this.props;
    if (isSearch) {
      if (type === 'keydown') {
        if (keyCode === 27) {
          updateSearchMode(false);
          this.setState({
            searchString: ''
          });
        } else if (keyCode === 13) {
          updateSearchMode(false);
          let { searchString } = this.state;
          this.setState(
            {
              searchString: ''
            },
            () => {
              this.handleAddTodo(null, searchString);
            }
          );
        }
      } else {
        updateSearchMode(false);
        this.setState({
          searchString: ''
        });
      }
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.disableSearchMode);
    document.addEventListener('keydown', this.disableSearchMode);
  }
}

export default connect(
  state => {
    return {
      isSearch: state.isSearch
    };
  },
  { getTodosBySearch, updateSearchMode, addTodo, getTodos }
)(SearchBox);
