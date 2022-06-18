import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../App.css';
import loginUser from '../../service/loginRequisitions';

function Login() {
  const [loginInput, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [btns, enableBtns] = useState(true);
  const history = useHistory();
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    const six = 6;
    if (password.length < six) return false;

    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g;
    if (!emailCheck.test(loginInput)) return false;

    if (loginInput && password) return enableBtns(false);
  }, [loginInput, password]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'customer') {
      history.push('/customer/products');
    }

    if (user && user.role === 'seller') {
      history.push('/seller/orders');
    }
  }, [history]);

  return (
    <form className="loginPage">
      <div
        className="loginInput"
      >
        Login
        <input
          type="email"
          data-testid="common_login__input-email"
          value={ loginInput }
          onChange={ (event) => setLogin(event.target.value) }
        />
      </div>
      <div
        className="loginInput"
      >
        Senha
        <input
          type="password"
          value={ password }
          data-testid="common_login__input-password"
          onChange={ (event) => setPassword(event.target.value) }
        />
      </div>
      <div>
        <button
          type="button"
          data-testid="common_login__button-login"
          disabled={ btns }
          onClick={ () => loginUser({
            email: loginInput,
            password }, history, setResponseMessage) }
        >
          LOGIN
        </button>
        <button
          type="button"
          data-testid="common_login__button-register"
          onClick={ () => history.push('/register') }
        >
          Ainda não tenho conta
        </button>
        <span data-testid="common_login__element-invalid-email">{ responseMessage }</span>
      </div>
    </form>
  );
}

export default Login;
