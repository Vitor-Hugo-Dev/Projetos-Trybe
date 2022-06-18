import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context/context';
import productsRequisitions from '../../service/productsRequisitions';

function Cards() {
  const { setCart } = useContext(Context);
  const history = useHistory();
  const [quantity, setQuantity] = useState({});
  const [products, setProducts] = useState([]);
  const [sumPrices, setSumPrices] = useState('0.00');

  const handleIncrease = (id, price) => {
    if (quantity[id]) return setQuantity({ ...quantity, [id]: quantity[id] + 1 });
    setSumPrices(sumPrices + (parseFloat(price) * (quantity[id] + 1)));
    return setQuantity({ ...quantity, [id]: 1 });
  };

  const handleDecrease = (id, price) => {
    if (quantity[id] === 0) return null;
    if (quantity[id]) return setQuantity({ ...quantity, [id]: quantity[id] - 1 });
    setSumPrices(sumPrices - parseFloat(price));
    return setQuantity({ ...quantity, [id]: 0 });
  };

  const handleClick = () => {
    const quantityArray = Object.keys(quantity);
    const quantityReducer = quantityArray.reduce((acc, curr) => {
      const { name, price } = products.find(({ id }) => id === Number(curr));
      const subTotal = parseFloat(price) * quantity[curr];
      const stringSum = subTotal.toFixed(2).replace('.', ',');
      acc.push({
        name,
        quantity: quantity[curr],
        'unit-price':
        price.replace('.', ','),
        'sub-total':
        stringSum,
      });
      return acc;
    }, []);
    setCart(quantityReducer);
    history.push('/customer/checkout');
  };

  useEffect(() => {
    const productsResult = async () => {
      const results = await productsRequisitions();
      setProducts(results);
    };
    productsResult();
  }, []);

  useEffect(() => {
    const sumEffect = Object.keys(quantity);
    if (sumEffect.length >= 1) {
      const sumReducer = sumEffect.reduce((acc, curr) => {
        const itemFind = products.find(({ id }) => id === Number(curr));
        const parsing = parseFloat(itemFind.price);
        acc += (parsing * quantity[curr]);
        return acc;
      }, 0);

      setSumPrices(sumReducer.toFixed(2).replace('.', ','));
    }
  }, [products, quantity]);

  return (
    <div>
      {products.map(({ id, name, price, urlImage }, index) => (
        <div
          key={ index }
          id={ id }
        >
          <h3
            data-testid={ `customer_products__element-card-title-${id}` }
            key={ name }
          >
            {name}
          </h3>
          <span
            data-testid={ `customer_products__element-card-price-${id}` }
            key={ price }
          >
            { price.replace('.', ',') }
          </span>
          <img
            width="63px"
            src={ urlImage }
            alt={ urlImage }
            data-testid={ `customer_products__img-card-bg-image-${id}` }
          />

          <button
            type="button"
            data-testid={ `customer_products__button-card-add-item-${id}` }
            onClick={ () => handleIncrease(id, price) }
          >
            +
          </button>
          <input
            data-testid={ `customer_products__input-card-quantity-${id}` }
            // placeholder="0"
            value={ quantity[id] || 0 }
            onChange={ (
              { target },
            ) => setQuantity({ ...quantity, [id]: Number(target.value),
            }) }
          />
          <button
            type="button"
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            onClick={ () => handleDecrease(id, price) }
          >
            -
          </button>
        </div>))}
      <div>
        <button
          type="button"
          data-testid="customer_products__button-cart"
          onClick={ handleClick }
          disabled={ sumPrices === '0.00' }
        >
          <span
            data-testid="customer_products__checkout-bottom-value"
          >
            { `Cart total: ${sumPrices}` }
          </span>
        </button>
      </div>
    </div>
  );
}

export default Cards;
