import api from './service';

const getOrder = async (id, history) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  try {
    const { data } = await api.get(`/sale/${id}`, {
      headers: { authorization: token },
    });

    return data;
  } catch (error) {
    history.push('/customer/orders');
  }
};

const editOrderStatus = async (id, history, nextStatus) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  try {
    await api.put(`/sale/${id}`, { status: nextStatus }, {
      headers: { authorization: token },
    });
  } catch (error) {
    history.push('/customer/orders');
  }
};

export { getOrder, editOrderStatus };
