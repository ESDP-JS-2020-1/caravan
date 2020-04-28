import {CREATE_REQUEST_ERROR, CREATE_REQUEST_INIT} from "../actions/requestsActions";

const initialState = {
	error: null,
};

const requestsReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_REQUEST_INIT:
			return {...state, error: null};
		case CREATE_REQUEST_ERROR:
			return {...state, error: action.error};
		default:
			return state;
	}
};

export default requestsReducer;