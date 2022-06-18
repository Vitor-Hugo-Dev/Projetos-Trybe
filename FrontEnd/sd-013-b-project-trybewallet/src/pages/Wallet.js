import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setExchangeRatesThunk as setExchangeRatesThunkAction, setIdcontrolAction,
} from '../actions/actionWallet';
import FormDespesas from '../components/FormDespesas';
import Header from '../components/Header';
import User from '../components/User';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.onClickUser = this.onClickUser.bind(this);
  }

  onClickUser(obj) {
    const { idControl, setExchangeRatesThunk, setId } = this.props;
    const { value, currency, method, tag, description } = obj;
    const objeto = {
      id: idControl,
      value,
      currency,
      description,
      method,
      tag,
      exchangeRates: {},
    };

    setExchangeRatesThunk(objeto);
    setId();
  }

  getMoedas() {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const moedas = fetch(url)
      .then((response) => response.json())
      .then((json) => json);
    return moedas;
  }

  render() {
    return (
      <main>
        <Header />
        <FormDespesas onClickUser={ this.onClickUser } />
        <User />
      </main>
    );
  }
}

Wallet.propTypes = {
  setExchangeRatesThunk: PropTypes.func.isRequired,
  idControl: PropTypes.number.isRequired,
  setId: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setExchangeRatesThunk: (payload) => dispatch(setExchangeRatesThunkAction(payload)),
  setId: () => dispatch(setIdcontrolAction()),
});

const mapStateToProps = ({ wallet: { expenses, idControl } }) => ({
  expenses,
  idControl,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
