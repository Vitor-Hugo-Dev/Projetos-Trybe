import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Provider from './context/provider';
import './App.css';
import Login from './app/pages/login';
import Register from './app/pages/register';
import Products from './app/pages/products';
import customerChekout from './app/pages/customerCheckout';
import OrderDetails from './app/pages/orderDetails';
import CustomerOrders from './app/pages/customerOrders';
import SellerOrder from './app/pages/sellerOrders';
import SellerDetails from './app/pages/sellerDetails';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={ Login } />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/register" component={ Register } />
          <Route path="/customer/products" component={ Products } />
          <Route path="/customer/checkout" component={ customerChekout } />
          <Route exact path="/customer/orders" component={ CustomerOrders } />
          <Route path="/customer/orders/:id" component={ OrderDetails } />
          <Route exact path="/seller/orders" component={ SellerOrder } />
          <Route path="/seller/orders/:id" component={ SellerDetails } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
