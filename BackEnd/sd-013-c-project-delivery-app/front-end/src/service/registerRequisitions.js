import api from './service';

const registerUser = async (body, history, setResponseMessage) => {
  try {
    const { data } = await api.post('/user', body);

    localStorage.setItem('user', JSON.stringify(data));
    history.push('/customer/products');
  } catch (error) {
    setResponseMessage(error.response.data.message);
  }
};

export default registerUser;
