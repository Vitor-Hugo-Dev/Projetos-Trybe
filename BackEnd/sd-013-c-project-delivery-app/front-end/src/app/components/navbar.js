import React from 'react';
import { Link } from 'react-router-dom';

function productsHeader() {
  const { name } = JSON.parse(localStorage.getItem('user'));
  return (
    <nav>
      <Link
        to="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
      >
        PRODUTOS
      </Link>
      <Link
        to="/customer/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        MEUS PEDIDOS
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

export default productsHeader;
