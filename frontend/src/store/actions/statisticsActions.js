import {GET_STATISTIC_ERROR, GET_STATISTIC_REQUEST, GET_STATISTIC_SUCCESS} from "./actionsTypes";
import axiosApi from "../../axiosAPI";

export const getStatisticRequest = () => ({type: GET_STATISTIC_REQUEST});
export const getStatisticSuccess = (statistics) => ({type: GET_STATISTIC_SUCCESS, statistics});
export const getStatisticError = (error) => ({type: GET_STATISTIC_ERROR, error});

export const getStatistics = (productId, day) => async dispatch => {
    try {
        dispatch(getStatisticRequest());
        const response = await axiosApi.get(`/stat/${productId}/${day}`);
        dispatch(getStatisticSuccess(response.data));
    } catch (e) {
        dispatch(getStatisticError(e))
    }
};