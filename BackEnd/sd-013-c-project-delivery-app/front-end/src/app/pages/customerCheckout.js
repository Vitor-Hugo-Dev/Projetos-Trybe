import React, { useEffect, useState, useContext } from 'react';
import Context from '../../context/context';
import CheckoutForm from '../components/checkoutForm';
import HeaderComponent from '../components/navbar';
import Table from '../components/table';

function CustomerCheckout() {
  const { cart, setCart } = useContext(Context);
  const tableColumns = ['Item', 'Descrição', 'Quantidade',
    'Valor Unitário', 'Sub-total', 'Remover Item'];

  const [cartArray, setCartArray] = useState(cart);
  const [total, setTotal] = useState('0,00');

  // useEffect(() => {
  //   setCartArray(cart || []);
  // }, []);

  useEffect(() => {
    const result = cartArray.reduce((acc, cur) => {
      const valueToNumber = parseFloat(cur['sub-total'].replace(/,/g, '.'));

      acc += valueToNumber;
      return acc;
    }, 0).toFixed(2);

    setTotal(result);
  }, [cartArray]);

  const handleRemove = (trToRemove) => {
    const newCartArray = cartArray.filter((tr) => tr !== trToRemove);
    setCartArray(newCartArray);
    setCart(newCartArray);
  };

  return (
    <main>
      <header>
        <HeaderComponent />
      </header>

      <section>
        <h2>Finalizar Pedido</h2>
        <Table
          ths={ tableColumns }
          tds={ cartArray }
          testidBody="customer_checkout"
          handleRemove={ handleRemove }
        />
        <span
          data-testid="customer_checkout__element-order-total-price"
        >
          { `Total: R$ ${total.replace('.', ',')}` }
        </span>
      </section>

      <section>
        <h2>Detalhes e Endereço para Entrega</h2>
        <CheckoutForm total={ total } products={ cartArray } />
      </section>
    </main>
  );
}

export default CustomerCheckout;
