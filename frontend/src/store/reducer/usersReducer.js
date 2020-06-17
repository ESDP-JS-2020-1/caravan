import {
    ADD_USER_FAILURE,
    CREATE_COORDINATE_SUCCESS,
    DELETE_USER_FAILURE,
    GET_USER_FAILURE,
    GET_USER_SUCCESS,
    GET_USERS_FAILURE,
    GET_USERS_SUCCESS,
    LOGIN_USER_FAILURE, LOGIN_USER_INIT,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS, USERS_ONLINE
} from "../actions/actionsTypes";

const initialState = {
    user: null,
    users: [],
    usersOnline: null,
    coordinates: {},
    client: null,
    error: null,
    coordinate: null
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_SUCCESS:
            return {...state, registerError: null};
        case REGISTER_USER_FAILURE:
            return {...state, registerError: action.error.message};
        case LOGIN_USER_INIT:
            return {...state, error: null};
        case LOGIN_USER_SUCCESS:
            return {...state, loginError: null, user: action.user};
        case LOGIN_USER_FAILURE:
            return {...state, error: action.error};
        case LOGOUT_USER:
            return {...state, user: null};

        case GET_USER_SUCCESS:
            return {...state, client: action.users};
        case GET_USER_FAILURE:
            return {...state, error: action.error};
        case GET_USERS_SUCCESS:
            return {...state, users: action.users};
        case GET_USERS_FAILURE:
            return {...state, error: action.error};
        case ADD_USER_FAILURE:
            return {...state, error: action.error.response.data};

        case DELETE_USER_FAILURE:
            return {...state, error: action.error.response.data.message};
        case CREATE_COORDINATE_SUCCESS:
            return {...state, coordinates: action.data};

        case USERS_ONLINE:
            return {...state, usersOnline: action.data}
        case 'ADD_COORDINATES':
            return {...state, coordinate: action.data}
        default:
            return state;
    }
};

export default usersReducer;