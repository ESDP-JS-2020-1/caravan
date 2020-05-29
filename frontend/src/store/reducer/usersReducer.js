import {
  ADD_USER_FAILURE,
  CREATE_COORDINATE_SUCCESS,
  DELETE_USER_FAILURE,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USERS_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  LOGIN_USER_FAILURE, LOGIN_USER_INIT,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS
} from "../actions/actionsTypes";

const initialState = {
  user: null,
  users: [],
  coordinates: {},
  client: null,
  loading: false,
  error: null,
  loginLoading: false
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {...state, registerLoading: true};
    case REGISTER_USER_SUCCESS:
      return {...state, registerLoading: false, registerError: null};
    case REGISTER_USER_FAILURE:
      return {...state, registerError: action.error, registerLoading: false};


    case LOGIN_USER_INIT:
      return {...state, error: null}
    case LOGIN_USER_REQUEST:
      return {...state, loginLoading: true};
    case LOGIN_USER_SUCCESS:
      return {...state, loginLoading: false, loginError: null, user: action.user};
    case LOGIN_USER_FAILURE:
      return {...state, loginLoading: false, error: action.error.response.data.message};
    case LOGOUT_USER:
      return {...state, user: null};

    case GET_USER_SUCCESS:
      return {...state, client: action.users};
    case GET_USER_REQUEST:
      return {...state, loading: true};
    case GET_USER_FAILURE:
      return {...state, error: action.error};

    case GET_USERS_SUCCESS:
      return {...state, users: action.users};
    case GET_USERS_REQUEST:
      return {...state, loading: true};
    case GET_USERS_FAILURE:

      return {...state, error: action.error};
    case ADD_USER_FAILURE:
      return {...state, error: action.error.response.data.message};

    case DELETE_USER_FAILURE:
      return {...state, error: action.error.response.data.message};
    case CREATE_COORDINATE_SUCCESS:
      return {...state, coordinates: action.data};

    default:
      return state;
  }
};

export default usersReducer;