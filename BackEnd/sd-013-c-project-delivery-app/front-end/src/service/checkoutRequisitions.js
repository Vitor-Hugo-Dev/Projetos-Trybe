import api from './service';

const getAllSellers = async () => {
  try {
    const { data } = await api.get('/user/search?role=seller');
    return data;
  } catch (error) {
    return [];
  }
};

const sendSale = async (body, setErrorMessage, history) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('user'));

    const { data: { id } } = await api.post('/sale', body, {
      headers: { authorization: token },
    });

    history.push(`/customer/orders/${id}`);
  } catch (error) {
    setErrorMessage(error.response.data.message);
  }
};

export { getAllSellers, sendSale };
