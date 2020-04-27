import {store as notification} from "react-notifications-component";
import config from '../../config'
import {push} from 'connected-react-router';

import axiosApi from "../../axiosAPI";

export const CREATE_PRODUCT_INIT = 'CREATE_PRODUCT_INIT';
export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_ERROR = 'CREATE_PRODUCT_ERROR';

export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR';

export const createProductRequest = () => ({type: CREATE_PRODUCT_REQUEST});
export const createProductSuccess = () => ({type: CREATE_PRODUCT_SUCCESS});
export const createProductError = error => ({type: CREATE_PRODUCT_ERROR, error});

export const getProductsRequest = () => ({type: GET_PRODUCTS_REQUEST});
export const getProductsSuccess = products => ({type: GET_PRODUCTS_SUCCESS, products});
export const getProductsError = error => ({type: GET_PRODUCTS_ERROR, error});

export const createProductInit = () => ({type: CREATE_PRODUCT_INIT});

export const getProductsList = () => async dispatch => {
  try {
    dispatch(getProductsRequest());
    const products = await axiosApi.get('/products');

    dispatch(getProductsSuccess(products.data))
  } catch (error) {
    dispatch(getProductsError(error));
  }
};

export const addNewProduct = productData => async (dispatch) => {
  try {
    dispatch(createProductRequest());

    console.log(productData);

    const products = productData.map(async (elem) => {
      const data = new FormData();
      Object.keys(elem).forEach(value => {
        data.append(value, elem[value])
      });
      return await axiosApi.post('/products', data);
    });

    await Promise.all(products);

    dispatch(createProductSuccess());

    notification.addNotification({
      title: 'Добавление продукта',
      message: `Продукт добавлен успешно`,
      ...config.notification
    });
    dispatch(push('/products'))
  } catch (error) {
    dispatch(createProductError(error))
  }
};