import axiosApi from "../../axiosAPI";

export const GET_HISTORIES_REQUEST = 'GET_HISTORIES_REQUEST';
export const GET_HISTORIES_SUCCESS = 'GET_HISTORIES_SUCCESS';
export const GET_HISTORIES_ERROR = 'GET_HISTORIES_ERROR';

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
