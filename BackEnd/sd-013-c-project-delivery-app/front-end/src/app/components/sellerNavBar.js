import React from 'react';
import { Link } from 'react-router-dom';

function navBar() {
  const { name } = JSON.parse(localStorage.getItem('user'));
  return (
    <nav>
      <Link
        to="/seller/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        PEDIDOS
      </Link>
      <Link
        data-testid="customer_products__element-navbar-user-full-name"
        to="/"
      >
        { name }
      </Link>
      <Link
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => localStorage.removeItem('user') }
        to="/"
      >
        Sair
      </Link>
    </nav>
  );
}

export default navBar;
