import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getOrder } from '../../service/orderDatailsRequisitions';
import handleDateFormat from '../../utils/handleDateFormat';
import NavBar from '../components/sellerNavBar';
import Table from '../components/table';
import client from '../../utils/client';

const PEDIDO_LENGTH = 4;
const TEST_ID_BODY = 'seller_order_details';
const tableColumns = ['Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total'];

function SellerDetails() {
  const params = useParams();
  const history = useHistory();
  const [saleInfo, setSaleInfo] = useState({});
  const [tableLines, setTableLines] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const { id } = params;

    getOrder(id, history).then((sale) => {
      setSaleInfo(sale);
      const lines = sale.products.map(({ quantity, Product: { price, name } }) => {
        const totalPrice = (price * quantity).toFixed(2).replace('.', ',');
        return { name, quantity, 'sub-total': price, 'total-price': totalPrice };
      });

      setTableLines(lines);
      setLoading(false);
    });
    // const { token } = JSON.parse(localStorage.getItem('user'));
    // const { decodedToken } = useJwt(token);
  }, [params, history]);

  useEffect(() => {
    client.on('updateStatus Response', (response) => {
      setSaleInfo(response);
    });
  }, []);

  const handleStatus = async (nextStatus) => {
    const { id } = params;
    // await editOrderStatus(id, history, nextStatus);
    client.emit('updateStatus', { id, status: nextStatus });
    setSaleInfo({ ...saleInfo, status: nextStatus });
  };

  const renderSections = () => (
    <>
      <h2>Detalhe do pedido</h2>
      <section>
        <span
          data-testid={ `${TEST_ID_BODY}__element-order-details-label-order-id` }
        >
          {`PEDIDO: ${String(saleInfo.id).padStart(PEDIDO_LENGTH, '0')}`}
        </span>

        <span
          data-testid={ `${TEST_ID_BODY}__element-order-details-label-order-date` }
        >
          { handleDateFormat(saleInfo.sale_date) }
        </span>

        <span
          data-testid={ `${TEST_ID_BODY}__element-order-details-label-delivery-status` }
        >
          {saleInfo.status}
        </span>

        <button
          type="button"
          disabled={ saleInfo.status !== 'Pendente' }
          data-testid={ `${TEST_ID_BODY}__button-preparing-check` }
          onClick={ () => handleStatus('Preparando') }
        >
          PREPARAR PEDIDO
        </button>

        <button
          type="button"
          disabled={ saleInfo.status !== 'Preparando' }
          data-testid={ `${TEST_ID_BODY}__button-dispatch-check` }
          onClick={ () => handleStatus('Em Trânsito') }
        >
          SAIU PARA ENTREGA
        </button>
      </section>

      <section>
        <Table
          ths={ tableColumns }
          tds={ tableLines }
          testidBody={ TEST_ID_BODY }
        />

        <span
          data-testid={ `${TEST_ID_BODY}__element-order-total-price` }
        >
          { `Total: R$ ${saleInfo.totalPrice.replace('.', ',')}` }
        </span>
      </section>
    </>
  );

  return (
    <main>
      <header>
        <NavBar />
      </header>

      {isLoading ? <span>loading</span> : renderSections()}
    </main>
  );
}

export default SellerDetails;
