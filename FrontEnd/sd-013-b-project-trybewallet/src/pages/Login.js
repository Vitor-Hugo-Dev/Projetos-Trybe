import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import actionLogin from '../actions/actionLogin';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      ableButton: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onclick = this.onclick.bind(this);
  }

  onclick() {
    const { history, emailDispatch } = this.props;
    const { email } = this.state;
    history.push('/carteira');
    emailDispatch(email);
  }

  verifyInfos() {
    const { email, senha } = this.state;
    const condition = 6;

    if (email.includes('.com') && senha.length >= condition) {
      this.setState({
        ableButton: false,
      });
    } else {
      this.setState({
        ableButton: true,
      });
    }
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,

    }, this.verifyInfos);
  }

  render() {
    const { email, senha, ableButton } = this.state;
    return (
      <div>
        <input
          name="email"
          value={ email }
          onChange={ this.handleChange }
          data-testid="email-input"
          type="email"
          placeholder="Email"
          required="true"
        />
        <input
          name="senha"
          value={ senha }
          onChange={ this.handleChange }
          data-testid="password-input"
          type="text"
          placeholder="Senha"
          required="true"
        />
        <button
          disabled={ ableButton }
          onClick={ this.onclick }
          type="button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  emailDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  emailDispatch: (payload) => dispatch(actionLogin(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
