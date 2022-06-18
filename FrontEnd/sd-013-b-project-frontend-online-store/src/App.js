import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import ShopCart from './Pages/ShopCart';
import CardDetails from './Pages/CardDetails';
import CheckOut from './Pages/CheckOut';
// FEITO POR TODOS VIA PAIR PROGRAMING;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartProducts: [],
    };
  }

  componentDidMount() {
    this.handleLocalStorageGetItemCart();
  }

  handleLocalStorageSetItemCart = () => {
    const { cartProducts } = this.state;
    localStorage.setItem('cartItems', JSON.stringify(cartProducts));
  }

  handleLocalStorageGetItemCart = () => {
    const cartLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
    if (!cartLocalStorage) return;
    this.setState({
      cartProducts: [...cartLocalStorage],
    });
  }

  handleClick = (product, value) => {
    const { cartProducts } = this.state;
    const cartFindId = cartProducts.find((idProduct) => idProduct.id === product.id);
    if (value === 'plus') {
      cartFindId.quantityCount += 1;
      this.setState((old) => ({
        cartProducts: [...old.cartProducts],
      }), this.handleLocalStorageSetItemCart);
      return null;
    } if (cartFindId.quantityCount === 0) return this.handleLocalStorageSetItemCart();
    cartFindId.quantityCount -= 1;
    this.setState((old) => ({
      cartProducts: [...old.cartProducts],
    }), this.handleLocalStorageSetItemCart);
    return null;
  }

  handleCartItems = (callback) => {
    const { cartProducts } = this.state;
    const cartFindId = cartProducts.find((idProduct) => idProduct.id === callback.id);
    if (cartFindId) {
      cartFindId.quantityCount += 1;
      this.setState((old) => ({
        cartProducts: [...old.cartProducts],
      }), this.handleLocalStorageSetItemCart);
    } else {
      this.setState((old) => ({
        cartProducts: [...old.cartProducts, { ...callback, quantityCount: 1 }],
      }), this.handleLocalStorageSetItemCart);
    }
  }

  render() {
    const { cartProducts } = this.state;
    const cartQuantity = cartProducts
      .reduce((accumulator, currentValue) => accumulator + currentValue.quantityCount, 0);
    // console.log(cartQuantity);

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<Home
              handleCartItems={ this.handleCartItems }
              cartQuantity={ cartQuantity }
            />) }
          />
          <Route
            path="/shopCart"
            render={ () => (<ShopCart
              cartProducts={ cartProducts }
              handleClick={ this.handleClick }
            />) }
          />
          <Route
            path="/details/:id"
            render={ (props) => (<CardDetails
              { ...props }
              handleCartItems={ this.handleCartItems }
              cartQuantity={ cartQuantity }
            />) }
          />
          <Route
            path="/checkout"
            component={ () => <CheckOut cartProducts={ cartProducts } /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
