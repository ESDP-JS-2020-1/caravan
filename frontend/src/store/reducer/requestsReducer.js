import {
    CREATE_REQUEST_ERROR,
    CREATE_REQUEST_INIT, FETCH_REQUEST_FAILURE,
    FETCH_REQUEST_SUCCESS,
    GET_REQUEST_ERROR, GET_REQUEST_INFO_FAILURE, GET_REQUEST_INFO_SUCCESS,
    GET_REQUEST_SUCCESS,
    GET_REQUESTS_ERROR,
    GET_REQUESTS_SUCCESS, PUT_REQUEST_FAILURE
} from "../actions/actionsTypes";

const initialState = {
    error: null,
    list: [],
    request: {},
    oneRequest: [],
    requestInfo:[]
};

const requestsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REQUEST_SUCCESS:
            return {...state, request: action.request};
        case GET_REQUEST_ERROR:
            return {...state, error: action.error};
        case GET_REQUESTS_SUCCESS:
            return {...state, list: action.requests};
        case GET_REQUESTS_ERROR:
            return {...state, error: action.error};
        case CREATE_REQUEST_INIT:
            return {...state, error: null};
        case CREATE_REQUEST_ERROR:
            return {...state, error: action.error};
        case FETCH_REQUEST_SUCCESS:
            return {...state, oneRequest: action.data};
        case FETCH_REQUEST_FAILURE:
            return {...state, error: action.error};
        case PUT_REQUEST_FAILURE:
            return {...state, error: action.error};
        case GET_REQUEST_INFO_SUCCESS:
            return {...state,requestInfo: action.data};
        case GET_REQUEST_INFO_FAILURE:
            return {...state,error: action.error};
        default:
            return state;
    }
};

export default requestsReducer;