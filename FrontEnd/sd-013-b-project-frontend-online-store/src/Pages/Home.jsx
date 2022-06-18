import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from '../Components/SearchBar';
import SideBar from '../Components/SideBar';
import ButtonSearch from '../Components/ButtonSearch';
import CardList from '../Components/CardList';
import * as api from '../services/api';
import shoppingCartIcon from '../images/shopping-cart.png';
import './pageStyles.css';

// REQUISITO 3 FEITO POR TODOS VIA PAIR PROGRAMING;

export default class Home extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCategoriesId = this.handleCategoriesId.bind(this);

    this.state = {
      searchValueHome: '',
      categoryId: '',
      productsArray: [],
    };
  }

  handleChange(callback) {
    this.setState({
      searchValueHome: callback,
    });
  }

  handleClick(callback) {
    this.setState({
      productsArray: callback,
    });
  }

  async handleCategoriesId(callback) {
    const resultApi = await this.fetchProductsFromCategoryAndQuery(callback);
    this.setState({
      categoryId: callback,
      productsArray: resultApi,
    });
  }

  handleCart = (callback) => {
    const { handleCartItems } = this.props;
    handleCartItems(callback);
  }

  fetchProductsFromCategoryAndQuery = async (categoryId) => {
    const response = await api
      .getProductsFromCategoryAndQuery(categoryId, '');
    return response.results;
  }

  render() {
    const { searchValueHome, productsArray, categoryId } = this.state;
    const { cartQuantity } = this.props;
    return (
      <div className="home">
        <SearchBar onInputChange={ this.handleChange } />
        <ButtonSearch
          searchValueHome={ searchValueHome }
          onButtonClick={ this.handleClick }
          categoryId={ categoryId }
        />
        <div className="cart-link">
          <div className="shopping-cart-element">
            <Link
              data-testid="shopping-cart-button"
              to="/shopCart"
            >
              <img className="cart-icon" src={ shoppingCartIcon } alt="cart" />
            </Link>
            <p data-testid="shopping-cart-size">
              { cartQuantity }
            </p>
          </div>
          <p>
            Ainda não sabe como presentear o love nesse Dia dos Namorados?
            A gente dá uma ajudinha e ela chama 20% de desconto em toda a loja!
          </p>
        </div>
        <div className="main-home">
          <SideBar handleCategoriesId={ this.handleCategoriesId } />
          <CardList productsList={ productsArray } handleCart={ this.handleCart } />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  cartQuantity: PropTypes.number.isRequired,
  handleCartItems: PropTypes.func.isRequired,
};
