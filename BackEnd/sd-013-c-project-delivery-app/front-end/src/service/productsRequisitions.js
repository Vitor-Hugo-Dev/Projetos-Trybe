import api from './service';

const getProducts = async () => {
  try {
    const { data } = await api.get('/products');
    return data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export default getProducts;
