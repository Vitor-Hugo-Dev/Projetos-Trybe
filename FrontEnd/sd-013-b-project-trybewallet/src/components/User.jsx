import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeExpenseAction } from '../actions/actionWallet';

class User extends Component {
  constructor(props) {
    super(props);

    this.onclick = this.onclick.bind(this);
  }

  onclick({ target }) { // função pra remover uma determinada despesa
    const { parentNode: { parentNode: { id } } } = target;
    const { removeExpense } = this.props;
    removeExpense(parseInt(id, 10));
    // return parentNode.remove();
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table border="1">
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {expenses.map((expense) => (
            <tr key={ expense.id } id={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ expense.value }</td>
              <td>{ (expense.exchangeRates[expense.currency].name).split('/')[0] }</td>
              <td>
                { Math.round(
                  expense.exchangeRates[expense.currency].ask * 100,
                ) / 100 }
              </td>
              <td>
                {
                  (
                    expense.value * expense.exchangeRates[expense.currency].ask
                  ).toFixed(2)
                }
              </td>
              <td>Real</td>
              <td>
                <button type="button" data-testid="delete-btn" onClick={ this.onclick }>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

User.propTypes = {
  expenses: PropTypes.shape(PropTypes.array).isRequired,
  removeExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (payload) => dispatch(removeExpenseAction(payload)),
});

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
