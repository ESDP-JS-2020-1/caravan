import {GET_STATISTIC_ERROR, GET_STATISTIC_SUCCESS} from "./actionsTypes";
import axiosApi from "../../axiosAPI";

import {push} from 'connected-react-router';

export const getStatisticSuccess = (statistics) => ({type: GET_STATISTIC_SUCCESS, statistics});
export const getStatisticError = (error) => ({type: GET_STATISTIC_ERROR, error});

export const getStatisticsProduct = (productId, day) => async dispatch => {
    try {
        const response = await axiosApi.get(`/stat/product/${productId}/${day}`);
        dispatch(getStatisticSuccess(response.data));

        dispatch(push(`/product/stat/${productId}/${day}`))
    } catch (e) {
        dispatch(getStatisticError(e))
    }
};

export const getStatisticsUser = (userId, day) => async dispatch => {
    try {
        const response = await axiosApi.get(`/stat/user/${userId}/${day}`);
        dispatch(getStatisticSuccess(response.data));
        dispatch(push(`/users/stat/${userId}/${day}`))
    } catch (e) {
        dispatch(getStatisticError(e))
    }
};