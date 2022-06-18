import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import getOrders from '../../service/sellerOrderRequisitions';
import handleDateFormat from '../../utils/handleDateFormat';
import client from '../../utils/client';
import NavBar from '../components/sellerNavBar';
// import sellerNavBar from '../components/sellerNavBar';

// import HeaderComponent from '../components/navbar';

const PEDIDO_LENGTH = 4;

function SellerOrders() {
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [order2, setOrder2] = useState([]);
  useEffect(() => {
    const order = async () => {
      const result = await getOrders();
      setOrder2(result);
      setOrders(result);
    };
    order();
  }, []);

  useEffect(() => {
    client.on('updateStatus Response', (response) => {
      const newArray = order2.filter((order) => order.id !== response.id);
      setOrders([...newArray, response]);
    });
  }, [order2]);

  const handleCardClick = (id) => {
    history.push(`/seller/orders/${id}`);
  };

  console.log(orders);
  return (
    <div>
      <NavBar />
      <section>
        {orders.map((order) => (
          <button
            type="button"
            key={ order.id }
            onClick={ () => handleCardClick(order.id) }
          >
            <p
              data-testid={ `seller_orders__element-order-id-${order.id}` }
            >
              { `Pedido ${String(order.id).padStart(PEDIDO_LENGTH, '0')}` }
            </p>

            <p
              data-testid={ `seller_orders__element-delivery-status-${order.id}` }
            >
              {order.status}
            </p>

            <p
              data-testid={ `seller_orders__element-order-date-${order.id}` }
            >
              { handleDateFormat(order.saleDate) }
            </p>

            <p
              data-testid={ `seller_orders__element-card-price-${order.id}` }
            >
              { `R$ ${order.totalPrice.replace('.', ',')}` }
            </p>
            <p
              data-testid={ `seller_orders__element-card-address-${order.id}` }
            >
              { `${order.deliveryAddress}, ${order.deliveryNumber}` }
            </p>
          </button>
        )) }
      </section>
    </div>
  );
}

export default SellerOrders;
