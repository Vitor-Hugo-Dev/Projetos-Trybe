import api from './service';

const getOrders = async () => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  try {
    const { data } = await api.get('/sale/seller', { headers: { authorization: token } });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export default getOrders;
