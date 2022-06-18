import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrenciesActionThunk } from '../actions/actionWallet';
import Select from './Select';

class FormDespesas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { currenciesDispatch } = this.props;
    currenciesDispatch();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { onClickUser, currencies } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            type="text"
            id="valor"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="descrição">
          Descrição:
          <input
            type="text"
            id="descrição"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select
            name="currency"
            id="moeda"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((moeda) => (
              moeda === 'USDT' ? null
                : <option key={ moeda } value={ moeda }>{moeda}</option>
            ))}
          </select>
        </label>
        <Select method={ method } tag={ tag } handleChange={ this.handleChange } />
        <button
          type="button"
          onClick={ () => onClickUser(this.state) }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

FormDespesas.propTypes = {
  onClickUser: PropTypes.func.isRequired,
  currenciesDispatch: PropTypes.func.isRequired,
  currencies: PropTypes.shape(PropTypes.string).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  currenciesDispatch: (payload) => dispatch(setCurrenciesActionThunk(payload)),
});
const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});
export default connect(mapStateToProps, mapDispatchToProps)(FormDespesas);
