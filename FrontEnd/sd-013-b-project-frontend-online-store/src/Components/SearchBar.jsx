import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

// REQUISITO 2 FEITO POR TODOS VIA PAIR PROGRAMING;

export default class SearchBar extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { onInputChange } = this.props;
    const { value } = target;
    onInputChange(value);
  }

  render() {
    return (
      <div className="searchBar">
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <label htmlFor="searchBar">
          <input
            data-testid="query-input"
            type="text"
            name="searchBar"
            onChange={ this.handleChange }
          />
        </label>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onInputChange: PropTypes.func.isRequired,
};
