import React from 'react';
import PropTypes from 'prop-types';

function Table({ ths, tds, testidBody, handleRemove }) {
  const setTableTds = (object, position) => {
    const valueArray = Object.values(object);
    const keyArray = Object.keys(object);
    valueArray.unshift(position);
    keyArray.unshift('item-number');

    const tdsResult = valueArray.map((columnValue, index) => (
      <td
        key={ index }
        data-testid={
          `${testidBody}__element-order-table-${keyArray[index]}-${position - 1}`
        }
      >
        { ths[index] === 'Sub-total' || ths[index] === 'Valor Unitário'
          ? `R$ ${columnValue}` : columnValue }
      </td>
    ));

    if (ths.some((th) => th === 'Remover Item')) {
      tdsResult.push(
        <td
          key={ tdsResult.length }
          data-testid={
            `customer_checkout__element-order-table-remove-${position - 1}`
          }
        >
          <button
            type="button"
            onClick={ () => handleRemove(tds[position - 1]) }
          >
            Remover
          </button>
        </td>,
      );
    }

    return tdsResult;
  };

  return (
    <main>
      <table>
        <thead>
          <tr>
            { ths.map((thValue, index) => <th key={ index }>{ thValue }</th>)}
          </tr>
        </thead>

        <tbody>
          { tds.map((trValue, index) => (
            <tr key={ index }>{ setTableTds(trValue, index + 1) }</tr>
          )) }
        </tbody>
      </table>
    </main>
  );
}

Table.defaultProps = {
  handleRemove: () => {},
};

Table.propTypes = {
  ths: PropTypes.arrayOf(PropTypes.string).isRequired,
  tds: PropTypes.arrayOf(PropTypes.object).isRequired,
  testidBody: PropTypes.string.isRequired,
  handleRemove: PropTypes.func,
};

export default Table;
