import {store as notification} from "react-notifications-component";
import config from '../../config';
import {push} from 'connected-react-router';
import {wordList} from "../../wordList";

import axiosApi from "../../axiosAPI";
import {
    CREATE_PRODUCT_ERROR, CREATE_PRODUCT_INIT,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    DELETE_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAILURE,
    EDIT_PRODUCT_SUCCESS,
    GET_PRODUCT_FAILURE,
    GET_PRODUCT_SUCCESS, GET_PRODUCTS_ERROR,
    GET_PRODUCTS_SUCCESS
} from "./actionsTypes";


export const deleteProductSuccess = () => ({type: DELETE_PRODUCT_SUCCESS});
export const deleteProductFailure = error => ({type: DELETE_PRODUCT_FAILURE, error});

export const editProductSuccess = () => ({type: EDIT_PRODUCT_SUCCESS});
export const editProductFailure = (error) => ({type: EDIT_PRODUCT_FAILURE, error});

export const getProductSuccess = data => ({type: GET_PRODUCT_SUCCESS, data});
export const getProductFailure = error => ({type: GET_PRODUCT_FAILURE, error});

export const createProductSuccess = () => ({type: CREATE_PRODUCT_SUCCESS});
export const createProductError = error => ({type: CREATE_PRODUCT_ERROR, error});

export const getProductsSuccess = products => ({type: GET_PRODUCTS_SUCCESS, products});
export const getProductsError = error => ({type: GET_PRODUCTS_ERROR, error});

export const createProductInit = () => ({type: CREATE_PRODUCT_INIT});

export const getProductsList = () => async dispatch => {
    try {
        const products = await axiosApi.get('/products');
        dispatch(getProductsSuccess(products.data))
    } catch (error) {
        dispatch(getProductsError(error));
    }
};

export const addNewProduct = productData => async (dispatch, getState) => {
    try {
        const language = getState().language.name;
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
            title: (wordList[language].productsActions.addProductTitle),
            message: (wordList[language].productsActions.addProductMessage),
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
            const response = await axiosApi.get('/products/' + id);
            response.data.addProduct = '';
            dispatch(getProductSuccess(response.data))
        } catch (e) {
            dispatch(getProductFailure(e))
        }

    }
};
export const putEditProduct = (id, data) => {
    return async (dispatch, getState) => {
        try {
            const language = getState().language.name;
            await axiosApi.put('/products/' + id, data);
            dispatch(editProductSuccess());

            notification.addNotification({
                title: (wordList[language].productsActions.editProductTitle),
                message: (wordList[language].productsActions.editProductMessage),
                ...config.notification
            });
            dispatch(push('/products'));
        } catch (e) {
            dispatch(editProductFailure(e))
        }

    }
};
export const deleteProduct = (id) => {
    return async (dispatch, getState) => {
        try {
            const language = getState().language.name;
            await axiosApi.delete(`/products/${id}`);
            dispatch(deleteProductSuccess());

            notification.addNotification({
                title: (wordList[language].productsActions.deleteProductTitle),
                message: (wordList[language].productsActions.deleteProductMessage),
                ...config.notification
            });
            dispatch(push('/products'));
        } catch (e) {
            dispatch(deleteProductFailure(e))
        }

    }
};