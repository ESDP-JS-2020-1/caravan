import axiosApi from "../../axiosAPI";
import {GET_HISTORIES_ERROR, GET_HISTORIES_SUCCESS} from "./actionsTypes";

export const getHistoriesSuccess = histories => ({type: GET_HISTORIES_SUCCESS, histories});
export const getHistoriesError = error => ({type: GET_HISTORIES_ERROR, error});

export const getHistoriesList = (page, limit) => async dispatch => {
    try {
        const histories = await axiosApi.get(`/histories/ ${page} / ${limit} `);
        dispatch(getHistoriesSuccess(histories.data))
    } catch (error) {
        dispatch(getHistoriesError(error));
    }
};
