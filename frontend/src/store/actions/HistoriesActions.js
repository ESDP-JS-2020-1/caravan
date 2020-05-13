import axiosApi from "../../axiosAPI";
import {GET_HISTORIES_ERROR, GET_HISTORIES_REQUEST, GET_HISTORIES_SUCCESS} from "./actionsTypes";



export const geHistoriesRequest = () => ({type: GET_HISTORIES_REQUEST});
export const getHistoriesSuccess = histories => ({type: GET_HISTORIES_SUCCESS, histories});
export const getHistoriesError = error => ({type: GET_HISTORIES_ERROR, error});

export const getHistoriesList = () => async dispatch => {
    try {
        dispatch(geHistoriesRequest());
        const histories = await axiosApi.get('/histories');
        dispatch(getHistoriesSuccess(histories.data))
    } catch (error) {
        dispatch(getHistoriesError(error));
    }
};
