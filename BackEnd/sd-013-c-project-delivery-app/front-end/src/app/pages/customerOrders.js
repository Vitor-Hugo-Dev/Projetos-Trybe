import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import getOrders from '../../service/customerOrderRequisitions';
import handleDateFormat from '../../utils/handleDateFormat';
import HeaderComponent from '../components/navbar';
import client from '../../utils/client';

const PEDIDO_LENGTH = 4;

function CustomerOrders() {
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [order2, setOrder2] = useState([]);

  useEffect(() => {
    const getAllOrders = async () => {
      const response = await getOrders();
      if (response.length > 0) {
        setOrder2(response);
        return setOrders(response);
      }
      return setErrorMessage(response);
    };

    getAllOrders();
  }, []);

  useEffect(() => {
    client.on('updateStatus Response', (response) => {
      const newArray = order2.filter((order) => order.id !== response.id);
      setOrders([...newArray, response]);
    });
  }, [order2]);

  const handleCardClick = (id) => {
    history.push(`/customer/orders/${id}`);
  };

  return (
    <main>
      <header>
        <HeaderComponent />
      </header>
      <h1>Pedidos</h1>

      <section>
        {orders.map(({ id, status, sale_date: saleDate, totalPrice }) => (
          <button type="button" key={ id } onClick={ () => handleCardClick(id) }>
            <p
              data-testid={ `customer_orders__element-order-id-${id}` }
            >
              { `Pedido ${String(id).padStart(PEDIDO_LENGTH, '0')}` }
            </p>

            <p
              data-testid={ `customer_orders__element-delivery-status-${id}` }
            >
              {status}
            </p>

            <p
              data-testid={ `customer_orders__element-order-date-${id}` }
            >
              { handleDateFormat(saleDate) }
            </p>

            <p
              data-testid={ `customer_orders__element-card-price-${id}` }
            >
              { `R$ ${totalPrice.replace('.', ',')}` }
            </p>
          </button>
        )) }
      </section>
      <span>{ errorMessage }</span>
    </main>
  );
}

export default CustomerOrders;
