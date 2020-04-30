import {
	CREATE_REQUEST_ERROR,
	CREATE_REQUEST_INIT,
	GET_REQUESTS_ERROR,
	GET_REQUESTS_REQUEST,
	GET_REQUESTS_SUCCESS
} from "../actions/requestsActions";

const initialState = {
	loading: null,
	error: null,
	list: []
};

const requestsReducer = (state = initialState, action) => {
	switch (action.type) {
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
		default:
			return state;
	}
};

export default requestsReducer;