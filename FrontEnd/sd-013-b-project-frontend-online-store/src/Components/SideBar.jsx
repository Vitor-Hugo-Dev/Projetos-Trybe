import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import './styles.css';

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
    this.handleId = this.handleId.bind(this);
  }

  componentDidMount() {
    this.requestCategoriesTypeRadio();
  }

  handleId({ target }) {
    const { handleCategoriesId } = this.props;
    handleCategoriesId(target.id);
  }

  async requestCategoriesTypeRadio() {
    const response = await api.getCategories();
    this.setState({ categories: response });
  }

  render() {
    const { categories } = this.state;
    return (
      <div className="sidebar">
        { categories.map((category) => (
          <div key={ category.name }>
            <label htmlFor={ category.id }>
              <input
                name="inputList"
                id={ category.id }
                type="radio"
                data-testid="category"
                onClick={ this.handleId }
              />
              { category.name }
            </label>
          </div>
        ))}
      </div>
    );
  }
}

SideBar.propTypes = {
  handleCategoriesId: PropTypes.func.isRequired,
};
