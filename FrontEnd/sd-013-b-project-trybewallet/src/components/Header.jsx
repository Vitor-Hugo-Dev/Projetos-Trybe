import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.sumDespesas = this.sumDespesas.bind(this);
  }

  sumDespesas() {
    const { expenses } = this.props;
    const total = expenses
      .reduce((acc, cur) => acc + cur.value * cur.exchangeRates[cur.currency].ask, 0);
    return total;
  }

  render() {
    const { email } = this.props;

    return (
      <header>
        <span data-testid="email-field">{`User:${email}`}</span>
        <span data-testid="total-field">{`Total: ${this.sumDespesas()}`}</span>
        <span data-testid="header-currency-field">{`Moeda: ${'BRL'}`}</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
