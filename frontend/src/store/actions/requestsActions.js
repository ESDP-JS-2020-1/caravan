import {push} from 'connected-react-router';
import axiosApi from "../../axiosAPI";
import {store as notification} from "react-notifications-component";
import config from "../../config";
import {wordList} from "../../wordList";
import {
    CREATE_REQUEST_ERROR,
    CREATE_REQUEST_INIT,
    CREATE_REQUEST_SUCCESS,
    FETCH_REQUEST_FAILURE,
    FETCH_REQUEST_REQUEST,
    FETCH_REQUEST_SUCCESS,
    GET_REQUEST_ERROR,
    GET_REQUEST_REQUEST,
    GET_REQUEST_SUCCESS,
    GET_REQUESTS_ERROR,
    GET_REQUESTS_REQUEST,
    GET_REQUESTS_SUCCESS, PUT_REQUEST_FAILURE,
    PUT_REQUEST_REQUEST,
    PUT_REQUEST_SUCCESS
} from "./actionsTypes";



export const fetchRequest = ()=>({type:FETCH_REQUEST_REQUEST});
export const fetchSuccess =data=>({type:FETCH_REQUEST_SUCCESS,data});
export const fetchFailure =error=>({type:FETCH_REQUEST_FAILURE, error});

export const putRequest = ()=>({type:PUT_REQUEST_REQUEST});
export const putSuccess =()=>({type:PUT_REQUEST_SUCCESS});
export const putFailure =error=>({type:PUT_REQUEST_FAILURE, error});

export const createRequestInit = () => ({type: CREATE_REQUEST_INIT});
export const createRequestSuccess = () => ({type: CREATE_REQUEST_SUCCESS});
export const createRequestError = error => ({type: CREATE_REQUEST_ERROR, error});

export const getRequestRequest = () => ({type: GET_REQUEST_REQUEST});
export const getRequestSuccess = request => ({type: GET_REQUEST_SUCCESS, request});
export const getRequestError = error => ({type: GET_REQUEST_ERROR, error});

export const getRequestsRequest = () => ({type: GET_REQUESTS_REQUEST});
export const getRequestsSuccess = requests => ({type: GET_REQUESTS_SUCCESS, requests});
export const getRequestsError = error => ({type: GET_REQUESTS_ERROR, error});

export const nominatedRequest = (courier, request) => async dispatch => {
    await axiosApi.post('/nominateRequest', {courier, request});

    dispatch(getRequest(request));
};

export const closeRequest = request => async dispatch => {
    await axiosApi.post('/requests/close/'+request);

    dispatch(getRequest(request));
};

export const deleteNominatedRequest = request => async dispatch => {
    await axiosApi.delete('/nominateRequest/'+request);

    dispatch(getRequest(request));
};

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

export const createRequest = requestData => async (dispatch, getState) => {
    try {
        const language = getState().language.name;
        await axiosApi.post('/requests', requestData);

        dispatch(createRequestSuccess());
        notification.addNotification({
            title: (wordList[language].requestsActions.createRequestTitle),
            message: (wordList[language].requestsActions.createRequestMessage),
            ...config.notification
        });
        dispatch(push('/'));
    } catch (e) {
        dispatch(createRequestError(e.response.data.error));
    }
};

export const fetchRequestEdit =id=>{
  return async dispatch =>{
      try {
          dispatch(fetchRequest());
          const response = await axiosApi.get('/requests/'+id);
          dispatch(fetchSuccess(response.data.request))
      }catch (e) {
          dispatch(fetchFailure(e))
      }
  }
};
export const putRequestEdit =(id,data)=>{
    return async (dispatch, getState) =>{
        try {
            const language = getState().language.name;
            dispatch(putRequest());
             await axiosApi.put('/requests/'+id,data);
            dispatch(putSuccess());
            dispatch(push('/'));
            notification.addNotification({
                title: (wordList[language].requestsActions.editRequestTitle),
                message: (wordList[language].requestsActions.editRequestMessage),
                ...config.notification
            });
        }catch (e) {
            console.log(e)
            dispatch(putFailure(e.response.data.error))
        }

    }
};
export const deleteRequestEdit =(id,data)=>{
    return async (dispatch, getState) =>{
        try {
            const language = getState().language.name;
            dispatch(putRequest());
            await axiosApi.delete('/requests/'+id,{data});
            dispatch(putSuccess());
            dispatch(push('/'));
            notification.addNotification({
                title: (wordList[language].requestsActions.deleteRequestTitle),
                message: (wordList[language].requestsActions.deleteRequestMessage),
                ...config.notification
            });
        }catch (e) {
            dispatch(putFailure(e))
        }

    }
};