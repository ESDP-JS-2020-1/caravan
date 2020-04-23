import axiosApi from "../../axiosAPI";
import {push} from 'connected-react-router';
import {toast} from "react-toastify";

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

export const GET_USERS_REQUEST = 'GET_USERS_REQUEST'
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE'

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST'
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE'

export const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const getUsersRequest = () => ({type: GET_USERS_REQUEST});
export const getUsersSuccess = users => ({type: GET_USERS_SUCCESS, users});
export const getUsersFailure = error => ({type: GET_USERS_FAILURE, error});

export const addUserRequest = () => ({type: ADD_USER_REQUEST})
export const addUserFailure = error => ({type: ADD_USER_FAILURE, error})

export const addUser = user => async dispatch => {
    try {
        dispatch(addUserRequest())
        await axiosApi.post('/users', user)

        dispatch(push('/users'))
    } catch (e) {
        dispatch(addUserFailure(e))
    }
}

export const logoutUser = () => {
    return {type: LOGOUT_USER};
};

export const getUsers = () => async dispatch => {
  try {
      dispatch(getUsersRequest())

      const resp = await axiosApi.get('/users');
      dispatch(getUsersSuccess(resp.data))
  } catch (e) {
      dispatch(getUsersFailure(e))
  }
};

export const loginUser = userData => {
    return async dispatch => {
        try {
            dispatch(loginUserRequest());
            const response = await axiosApi.post('/users/sessions', userData);
            dispatch(loginUserSuccess(response.data));
            dispatch(push('/'));
            toast.success('Вы успешно залогинились', {
                position: toast.POSITION.TOP_CENTER
            });
        } catch (error) {
            dispatch(loginUserFailure(error.response.data));
        }
    }
};

export const logoutUserGet = () => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const headers = {'Authorization': 'Token ' + token};
        await axiosApi.delete('/users/sessions', {headers});
        dispatch(logoutUser());
        dispatch(push('/'))
    }
};