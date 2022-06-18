import React from 'react';
import HeaderComponent from '../components/navbar';
import ProductsCards from '../components/cards';

function Products() {
  return (
    <div>
      <HeaderComponent />
      <main>
        <ProductsCards />
      </main>
    </div>
  );
}

export default Products;
