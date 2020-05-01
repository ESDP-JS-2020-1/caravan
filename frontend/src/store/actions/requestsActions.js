import {push} from 'connected-react-router';
import axiosApi from "../../axiosAPI";
import {store as notification} from "react-notifications-component";
import config from "../../config";
import {
    CREATE_REQUEST_ERROR,
    CREATE_REQUEST_INIT,
    CREATE_REQUEST_SUCCESS, GET_REQUEST_ERROR,
    GET_REQUEST_REQUEST,
    GET_REQUEST_SUCCESS, GET_REQUESTS_ERROR, GET_REQUESTS_REQUEST, GET_REQUESTS_SUCCESS
} from "./actionsTypes";

export const createRequestInit = () => ({type: CREATE_REQUEST_INIT});
export const createRequestSuccess = () => ({type: CREATE_REQUEST_SUCCESS});
export const createRequestError = error => ({type: CREATE_REQUEST_ERROR, error});

export const getRequestRequest = () => ({type: GET_REQUEST_REQUEST});
export const getRequestSuccess = request => ({type: GET_REQUEST_SUCCESS, request});
export const getRequestError = error => ({type: GET_REQUEST_ERROR, error});

export const getRequestsRequest = () => ({type: GET_REQUESTS_REQUEST});
export const getRequestsSuccess = requests => ({type: GET_REQUESTS_SUCCESS, requests});
export const getRequestsError = error => ({type: GET_REQUESTS_ERROR, error});

export const getRequest = id => async (dispatch) => {
    try {
        dispatch(getRequestRequest());
        const request = await axiosApi.get('/requests/'+id);

        dispatch(getRequestSuccess(request.data));
    } catch (e) {
        dispatch(getRequestError(e));
    }
};

export const getRequests = () => async dispatch => {
    try {
        dispatch(getRequestsRequest());
        const requests = await axiosApi.get('/requests');

        dispatch(getRequestsSuccess(requests.data));
    } catch (e) {
        dispatch(getRequestsError(e));
    }
};

export const createRequest = requestData => async dispatch => {
    try {
        await axiosApi.post('/requests', requestData);

        dispatch(createRequestSuccess());
        notification.addNotification({
            title: 'Создание заявки',
            message: `Заявка создана успешно`,
            ...config.notification
        });
        dispatch(push('/'));
    } catch (e) {
        dispatch(createRequestError(e));
    }
};