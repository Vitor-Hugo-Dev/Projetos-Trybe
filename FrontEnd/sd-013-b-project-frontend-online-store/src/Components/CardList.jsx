import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ButtonCart from './ButtonCart';

export default class CardList extends Component {
  render() {
    const { productsList, handleCart } = this.props;
    const mapCart = productsList.map((product) => (
      <div key={ product.id } data-testid="product" className="product-card">
        <p className="product-title">{ product.title }</p>
        <img src={ product.thumbnail } alt="product" />
        <p>
          R$
          <span className="product-price-number">{ product.price }</span>
        </p>
        <div className="product-card-links">
          <Link
            to={ { pathname: `/details/${product.id}`, state: { product } } }
            data-testid="product-detail-link"
          >
            Ver detalhes
          </Link>
          <ButtonCart handleCartItems={ () => handleCart(product) } />
        </div>
      </div>
    ));
    return (
      <div className="cardlist">
        { mapCart }
      </div>
    );
  }
}

CardList.propTypes = {
  productsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCart: PropTypes.func.isRequired,
};
