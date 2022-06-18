import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getAllSellers, sendSale } from '../../service/checkoutRequisitions';

function CheckoutForm({ total, products }) {
  const history = useHistory();
  const [sellers, setSellers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    sellerId: 0,
    deliveryAddress: '',
    deliveryNumber: '',
  });

  useEffect(() => {
    getAllSellers().then((data) => {
      setSellers(data);
      setFormData({
        sellerId: data[0].id,
        deliveryAddress: '',
        deliveryNumber: '',
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalPrice = parseFloat(total);

    await sendSale({
      saleInfo: { totalPrice, ...formData }, products,
    }, setErrorMessage, history);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="seller-select">
        P. Vendedora Responsável:
        <select
          name="seller-select"
          id="seller-select"
          onChange={ ({ target }) => setFormData({
            ...formData, sellerId: target.value,
          }) }
          data-testid="customer_checkout__select-seller"
        >
          { sellers.map((seller, index) => (
            <option key={ index } value={ seller.id }>{ seller.name }</option>
          )) }
        </select>
      </label>

      <label htmlFor="address-input">
        Endereço:
        <input
          type="text"
          id="address-input"
          value={ formData.deliveryAddress }
          required
          onChange={ ({ target }) => setFormData({
            ...formData, deliveryAddress: target.value,
          }) }
          data-testid="customer_checkout__input-address"
        />
      </label>

      <label htmlFor="address-number">
        Número:
        <input
          type="text"
          id="address-number"
          value={ formData.deliveryNumber }
          required
          onChange={ ({ target }) => setFormData({
            ...formData, deliveryNumber: target.value,
          }) }
          data-testid="customer_checkout__input-addressNumber"
        />
      </label>

      <button
        type="submit"
        data-testid="customer_checkout__button-submit-order"
      >
        FINALIZAR PEDIDO
      </button>

      <span>{ errorMessage }</span>
    </form>
  );
}

CheckoutForm.propTypes = {
  total: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CheckoutForm;
