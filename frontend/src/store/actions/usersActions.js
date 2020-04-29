import axiosApi from "../../axiosAPI";
import {push} from 'connected-react-router';
import {toast} from "react-toastify";
import {store as notification} from "react-notifications-component";
import config from '../../config'

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export const getUserRequest = () => ({type: GET_USER_REQUEST});
export const getUserSuccess = users => ({type: GET_USER_SUCCESS, users});
export const getUserFailure = error => ({type: GET_USER_FAILURE, error});

export const getUsersRequest = () => ({type: GET_USERS_REQUEST});
export const getUsersSuccess = users => ({type: GET_USERS_SUCCESS, users});
export const getUsersFailure = error => ({type: GET_USERS_FAILURE, error});

export const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const addUserRequest = () => ({type: ADD_USER_REQUEST});
export const addUserFailure = error => ({type: ADD_USER_FAILURE, error});

export const deleteUserRequest = () => ({type: DELETE_USER_REQUEST});
export const deleteUserSuccess = () => ({type: DELETE_USER_SUCCESS});
export const deleteUserFailure = error => ({type: DELETE_USER_FAILURE, error});

export const getUser = id => async dispatch => {
  try {
    dispatch(getUserRequest());

    const resp = await axiosApi.get('/users/'+id);
    dispatch(getUserSuccess(resp.data))
  } catch (e) {
    dispatch(getUserFailure(e))
  }
};

export const getUsers = role => async dispatch => {
  try {
    dispatch(getUsersRequest());
    if(role){
      const resp = await axiosApi.get('/users?role='+role);
      return dispatch(getUsersSuccess(resp.data))
    }

    const resp = await axiosApi.get('/users');
    dispatch(getUsersSuccess(resp.data))
  } catch (e) {
    dispatch(getUsersFailure(e))
  }
};

export const addUser = user => async dispatch => {
  try {
    dispatch(addUserRequest());
    await axiosApi.post('/users', user);

    dispatch(push('/users'));
    toast.success('Пользователь добавлен успешно', {
      position: toast.POSITION.TOP_CENTER
    });

    notification.addNotification({
      title: 'Добавление пользователя',
      message: `Пользователь добавлен успешно`,
      ...config.notification
    });
  } catch (e) {
    dispatch(addUserFailure(e))
  }
};

export const deleteUser = (id, comment) => async dispatch => {
  try {
    dispatch(deleteUserRequest());
    await axiosApi.delete(`/users/${id}`, {data: comment});

    dispatch(push('/users'));
    dispatch(deleteUserSuccess());

    notification.addNotification({
      title: "Удаленик",
      message: 'Пользователь успешно удален',
      ...config.notification
    });
  } catch (e) {
    dispatch(deleteUserFailure(e))
  }
};

export const logoutUser = () => {
  return {type: LOGOUT_USER};
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

      notification.addNotification({
        title: 'Логин',
        message: `Вы успешно вошли, как ${response.data.displayName}`,
        ...config.notification
      });
    } catch (error) {
      dispatch(loginUserFailure(error));
    }
  }
};

export const editUser = (userData, id) => {
  return async (dispatch, getState) => {
    try {
      const _id = await getState().users.user._id;
      const response = await axiosApi.put(`/users/edit/${id}`, userData);
      if(response.data._id === _id) dispatch(loginUserSuccess(response.data));
      dispatch(push('/users'))
    } catch (error) {
      console.log(error);
    }
  }
};

export const logoutUserGet = () => {
  return async (dispatch, getState) => {
    const token = getState().users.user.token;
    const headers = {'Authorization': 'Token ' + token};
    await axiosApi.delete('/users/sessions', {headers});

    dispatch(push('/login'));
    dispatch(logoutUser());

    notification.addNotification({
      title: "Логаут",
      message: 'Вы успешно покинули свой аккаунт',
      ...config.notification
    });

  }
};