import {GET_STATISTIC_ERROR, GET_STATISTIC_SUCCESS, STATISTIC_INIT} from "./actionsTypes";
import axiosApi from "../../axiosAPI";

import {push} from 'connected-react-router';

export const getStatisticSuccess = productStatistic => ({type: GET_STATISTIC_SUCCESS, productStatistic});
export const getStatisticError = error => ({type: GET_STATISTIC_ERROR, error});

export const statisticInit = () => ({type: STATISTIC_INIT})

export const getStatistics = (id, day, type) => async dispatch => {
    try {
        const response = await axiosApi.get(`/stat/${type}/${id}/${day}`);
        dispatch(getStatisticSuccess(response.data));

        dispatch(push(`/statistics`))
    } catch (e) {
        dispatch(getStatisticError(e))
    }
};