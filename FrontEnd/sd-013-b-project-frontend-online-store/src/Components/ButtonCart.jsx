import React, { Component } from 'react';
import PropTypes from 'prop-types';

// REQUISITO 3 FEITO POR TODOS VIA PAIR PROGRAMING;

export default class ButtonCart extends Component {
  render() {
    const { productDetail } = this.props;
    if (productDetail === 'productDetail') {
      const { product, handleCartItems } = this.props;
      return (
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          cartProducts={ product }
          onClick={ () => handleCartItems(product) }
        >
          Adicionar ao carrinho
        </button>
      );
    }
    const { product, handleCartItems } = this.props;
    return (
      <button
        data-testid="product-add-to-cart"
        type="button"
        onClick={ () => handleCartItems(product) }
      >
        Adicionar ao carrinho
      </button>
    );
  }
}

ButtonCart.propTypes = {
  product: PropTypes.objectOf(PropTypes.object),
  handleCartItems: PropTypes.func,
  productDetail: PropTypes.string,
};

ButtonCart.defaultProps = {
  product: {},
  handleCartItems: '',
  productDetail: '',
};
