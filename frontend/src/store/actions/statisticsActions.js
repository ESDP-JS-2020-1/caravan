import {GET_PRODUCT_STATISTIC_SUCCESS, GET_PRODUCT_STATISTIC_ERROR, GET_USER_STATISTIC_SUCCESS} from "./actionsTypes";
import axiosApi from "../../axiosAPI";

import {push} from 'connected-react-router';

export const getProductStatisticSuccess = productStatistic => ({type: GET_PRODUCT_STATISTIC_SUCCESS, productStatistic});
export const getProductStatisticError = error => ({type: GET_PRODUCT_STATISTIC_ERROR, error});

export const getUserStatisticSuccess = userStatistic => ({type: GET_USER_STATISTIC_SUCCESS, userStatistic});
export const getUserStatisticError = error => ({type: GET_USER_STATISTIC_SUCCESS, error});

export const getStatisticsProduct = (productId, day) => async dispatch => {
    try {
        const response = await axiosApi.get(`/stat/product/${productId}/${day}`);
        dispatch(getProductStatisticSuccess(response.data));

        dispatch(push(`/product/stat/${productId}/${day}`))
    } catch (e) {
        dispatch(getProductStatisticError(e))
    }
};

export const getStatisticsProducts = (productId, day) => async dispatch => {
    try {
        const response = await axiosApi.get(`/stat/product/${productId}/${day}`);
        dispatch(getProductStatisticSuccess(response.data));
    } catch (e) {
        dispatch(getProductStatisticError(e))
    }
};

export const getStatisticsUser = (userId, day) => async dispatch => {
    try {
        const response = await axiosApi.get(`/stat/user/${userId}/${day}`);
        dispatch(getUserStatisticSuccess(response.data));

        dispatch(push(`/users/stat/${userId}/${day}`))
    } catch (e) {
        dispatch(getUserStatisticError(e))
    }
};