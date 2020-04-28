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

export const GET_PRODUCT_REQUEST = 'GET_PRODUCT_REQUEST';
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE';

export const EDIT_PRODUCT_REQUEST = 'EDIT_PRODUCT_REQUEST';
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';
export const EDIT_PRODUCT_FAILURE = 'EDIT_PRODUCT_FAILURE';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

export const deleteProductRequest = () => ({type: DELETE_PRODUCT_REQUEST});
export const deleteProductSuccess = () => ({type: DELETE_PRODUCT_SUCCESS});
export const deleteProductFailure = error => ({type: DELETE_PRODUCT_FAILURE});

export const editProductRequest = () => ({type: EDIT_PRODUCT_REQUEST});
export const editProductSuccess = () => ({type: EDIT_PRODUCT_SUCCESS});
export const editProductFailure = (error) => ({type: EDIT_PRODUCT_FAILURE, error});

export const getProductRequest = () => ({type: GET_PRODUCT_REQUEST});
export const getProductSuccess = data => ({type: GET_PRODUCT_SUCCESS, data});
export const getProductFailure = error => ({type: GET_PRODUCT_FAILURE, error});

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
        await axiosApi.post('/products', productData);

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

export const getProductEdit = id => {
    return async dispatch => {
        try {
            dispatch(getProductRequest());
            const response = await axiosApi.get('/products/' + id);
            dispatch(getProductSuccess(response.data))
        } catch (e) {
            dispatch(getProductFailure(e))
        }

    }
};
export const putEditProduct = (id, data) => {
    return async dispatch => {
        try {
            dispatch(editProductRequest());
            await axiosApi.put('/products/' + id, data);
            dispatch(editProductSuccess());

            notification.addNotification({
                title: 'Редактирование',
                message: `Продукт успешно изменён`,
                ...config.notification
            });
            dispatch(push('/products'));
        } catch (e) {
            dispatch(editProductFailure(e))
        }

    }
};
export const deleteProduct = id => {

    return async dispatch => {
        try {
            dispatch(deleteProductRequest());
            await axiosApi.delete('/products/' + id);
            dispatch(deleteProductSuccess());

            notification.addNotification({
                title: 'Редактирование',
                message: `Продукт успешно удален`,
                ...config.notification
            });
            dispatch(push('/products'));
        } catch (e) {
            dispatch(deleteProductFailure(e))
        }

    }
};