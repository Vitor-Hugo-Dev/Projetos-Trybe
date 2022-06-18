import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import registerUser from '../../service/registerRequisitions';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [responseMessage, setResponseMessage] = useState('');
  const [btnStatus, setBtnStatus] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const { name, email, password } = formData;
    const PASSWORD_LENGTH = 6;
    const NAME_LENGTH = 12;
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g;

    const result = [];

    if (name.length < NAME_LENGTH || password.length < PASSWORD_LENGTH) result.push(true);
    if (!emailCheck.test(email)) result.push(true);

    setBtnStatus(result.some((index) => index === true));
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(formData, history, setResponseMessage);
  };

  return (
    <main>
      <h1>Cadastro</h1>

      <form onSubmit={ handleSubmit }>
        <label htmlFor="name-input">
          Nome
          <input
            type="text"
            placeholder="Seu nome"
            value={ formData.name }
            id="name-input"
            data-testid="common_register__input-name"
            onChange={ ({ target }) => setFormData({ ...formData, name: target.value }) }
            required
          />
        </label>

        <label htmlFor="email-input">
          Email
          <input
            type="text"
            placeholder="email@site.com"
            value={ formData.email }
            id="email-input"
            data-testid="common_register__input-email"
            onChange={ ({ target }) => setFormData({ ...formData, email: target.value }) }
            required
          />
        </label>

        <label htmlFor="password-input">
          Senha
          <input
            type="password"
            placeholder="*******"
            value={ formData.password }
            id="password-input"
            data-testid="common_register__input-password"
            onChange={ ({ target }) => setFormData({
              ...formData,
              password: target.value,
            }) }
            required
          />
        </label>

        <button
          type="submit"
          data-testid="common_register__button-register"
          disabled={ btnStatus }
        >
          Cadastrar
        </button>
      </form>

      <span
        data-testid="common_register__element-invalid_register"
      >
        { responseMessage }
      </span>
    </main>
  );
}

export default Register;
