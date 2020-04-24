import {
  ADD_USER_FAILURE, DELETE_USER_FAILURE, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS,
  GET_USERS_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS
} from "../actions/usersActions";

const initialState = {
  user: null,
  users: [],
  client: null,
  loading: false,
  error: null,
  loginLoading: false,
  loginError: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {...state, registerLoading: true};
    case REGISTER_USER_SUCCESS:
      return {...state, registerLoading: false, registerError: null};
    case REGISTER_USER_FAILURE:
      return {...state, registerError: action.error, registerLoading: false};

    case LOGIN_USER_REQUEST:
      return {...state, loginLoading: true};
    case LOGIN_USER_SUCCESS:
      return {...state, loginLoading: false, loginError: null, user: action.user};
    case LOGIN_USER_FAILURE:
      return {...state, loginLoading: false, loginError: action.error};
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

    default:
      return state;
  }
};

export default usersReducer;