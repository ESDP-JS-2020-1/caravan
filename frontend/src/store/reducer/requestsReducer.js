import {
	CREATE_REQUEST_ERROR,

	CREATE_REQUEST_INIT, FETCH_REQUEST_FAILURE,
	FETCH_REQUEST_REQUEST,
	FETCH_REQUEST_SUCCESS,
	GET_REQUEST_ERROR,
	GET_REQUEST_REQUEST,
	GET_REQUEST_SUCCESS,


	GET_REQUESTS_ERROR,
	GET_REQUESTS_REQUEST,
	GET_REQUESTS_SUCCESS, PUT_REQUEST_FAILURE, PUT_REQUEST_REQUEST, PUT_REQUEST_SUCCESS
} from "../actions/actionsTypes";

const initialState = {
	loading: null,
	error: null,
	list: [],
	request: {},
	oneRequest:[]

};

const requestsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_REQUEST_REQUEST:
			return {...state, loading: true};
		case GET_REQUEST_SUCCESS:
			return {...state, request: action.request, loading: false};
		case GET_REQUEST_ERROR:
			return {...state, loading: false, error: action.error};

		case GET_REQUESTS_REQUEST:
			return {...state, loading: true};
		case GET_REQUESTS_SUCCESS:
			return {...state, list: action.requests, loading: false};
		case GET_REQUESTS_ERROR:
			return {...state, loading: false, error: action.error};

		case CREATE_REQUEST_INIT:
			return {...state, error: null};
		case CREATE_REQUEST_ERROR:
			return {...state, error: action.error};
		case FETCH_REQUEST_REQUEST:
			return {...state,loading: true};
		case FETCH_REQUEST_SUCCESS:
			return {...state,loading: false,oneRequest: action.data};
		case FETCH_REQUEST_FAILURE:
			return {...state,loading: false,error: action.error};
		case PUT_REQUEST_REQUEST:
			return {...state,loading: true};
		case PUT_REQUEST_SUCCESS:
			return {...state,loading: false};
		case PUT_REQUEST_FAILURE:
			return {...state,loading: false, error: action.error};
		default:
			return state;
	}
};

export default requestsReducer;