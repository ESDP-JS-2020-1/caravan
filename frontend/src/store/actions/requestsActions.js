import {push} from 'connected-react-router';
import axiosApi from "../../axiosAPI";
import {store as notification} from "react-notifications-component";
import config from "../../config";

export const CREATE_REQUEST_INIT = 'CREATE_REQUEST_INIT';
export const CREATE_REQUEST_SUCCESS = 'CREATE_REQUEST_SUCCESS';
export const CREATE_REQUEST_ERROR = 'CREATE_REQUEST_ERROR';

export const GET_REQUESTS_REQUEST = 'GET_REQUESTS_REQUEST';
export const GET_REQUESTS_SUCCESS = 'GET_REQUESTS_SUCCESS';
export const GET_REQUESTS_ERROR = 'GET_REQUESTS_ERROR';

export const createRequestInit = () => ({type: CREATE_REQUEST_INIT});
export const createRequestSuccess = () => ({type: CREATE_REQUEST_SUCCESS});
export const createRequestError = error => ({type: CREATE_REQUEST_ERROR, error});

export const getRequestsRequest = () => ({type: GET_REQUESTS_REQUEST});
export const getRequestsSuccess = requests => ({type: GET_REQUESTS_SUCCESS, requests});
export const getRequestsError = error => ({type: GET_REQUESTS_ERROR, error});

export const getRequests = () => async (dispatch) => {
    try {
        dispatch(getRequestsRequest());
        const requests = await axiosApi.get('/requests');

        dispatch(getRequestsSuccess(requests.data));
    } catch (e) {
        dispatch(getRequestsError(e));
    }
};

export const createRequest = requestData => async (dispatch) => {
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