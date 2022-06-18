import api from './service';

const loginUser = async (body, history, setResponseMessage) => {
  try {
    const { data } = await api.post('/login', body);

    localStorage.setItem('user', JSON.stringify(data));

    if (data.role === 'seller') return history.push('/seller/orders');
    return history.push('/customer/products');
  } catch (error) {
    setResponseMessage(error.response.data.message);
  }
};

export default loginUser;
