import axiosApi from "../../axiosAPI";
import {push} from 'connected-react-router';
import {store as notification} from "react-notifications-component";
import {
    ADD_USER_FAILURE, ADD_USER_INIT, CREATE_COORDINATE_SUCCESS, DELETE_USER_FAILURE, DELETE_USER_SUCCESS,
    GET_USER_FAILURE,
    GET_USER_SUCCESS, GET_USERS_FAILURE,
    GET_USERS_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_INIT, LOGIN_USER_SUCCESS, LOGOUT_USER
} from "./actionsTypes";
import config from '../../config';
import {wordList} from "../../wordList";

export const getUserSuccess = users => ({type: GET_USER_SUCCESS, users});
export const getUserFailure = error => ({type: GET_USER_FAILURE, error});

export const getUsersSuccess = users => ({type: GET_USERS_SUCCESS, users});
export const getUsersFailure = error => ({type: GET_USERS_FAILURE, error});

export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const LoginUserInit = () => ({type: LOGIN_USER_INIT});

export const addUserFailure = error => ({type: ADD_USER_FAILURE, error});

export const deleteUserSuccess = () => ({type: DELETE_USER_SUCCESS});
export const deleteUserFailure = error => ({type: DELETE_USER_FAILURE, error});

export const addUserInit =()=>({type:ADD_USER_INIT});

export const createCoordinateSuccess = (data) => ({type: CREATE_COORDINATE_SUCCESS, data});

export const getUser = id => async dispatch => {
    try {
        const resp = await axiosApi.get('/users/' + id);
        dispatch(getUserSuccess(resp.data))
    } catch (e) {
        dispatch(getUserFailure(e))
    }
};

export const getMarketsLocations = () => async dispatch => {
    try {
        const resp = await axiosApi.get('/users/locations');
        dispatch(getUsersSuccess(resp.data))
    } catch (e) {
        dispatch(getUsersFailure(e))
    }
}

export const getUsers = role => async dispatch => {
    try {
        if (role) {
            const resp = await axiosApi.get('/users?role=' + role);
            return dispatch(getUsersSuccess(resp.data))
        }
        const resp = await axiosApi.get('/users');
        dispatch(getUsersSuccess(resp.data))
    } catch (e) {
        dispatch(getUsersFailure(e))
    }
};

export const addUser = user => async (dispatch, getState) => {
    try {
        const language = getState().language.name;
        await axiosApi.post('/users', user);
        dispatch(push('/users'));

        notification.addNotification({
            title: (wordList[language].usersActions.addUserTitle),
            message: (wordList[language].usersActions.addUserMessage),
            ...config.notification
        });
    } catch (e) {
        dispatch(addUserFailure(e.response.data))
    }
};

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        const language = getState().language.name;
        await axiosApi.delete(`/users/${id}`);
        dispatch(push('/users'));
        dispatch(deleteUserSuccess());
        notification.addNotification({
            title: (wordList[language].usersActions.deleteUserTitle),
            message: (wordList[language].usersActions.deleteUserMessage),
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
    return async (dispatch, getState) => {
        try {
            const language = getState().language.name;
            const response = await axiosApi.post('/users/sessions', userData);
            dispatch(loginUserSuccess(response.data));
            dispatch(push('/'));
            notification.addNotification({
                title: (wordList[language].usersActions.loginUserTitle),
                message: (wordList[language].usersActions.loginUserMessage) + response.data.displayName,
                ...config.notification
            });
        } catch (error) {
            dispatch(loginUserFailure(error.response.data));
        }
    }
};

export const editUser = (userData, id) => {
    return async (dispatch, getState) => {
        try {
            const username = await getState().users.user.username;
            const response = await axiosApi.put(`/users/edit/${id}`, userData);
            if (response.data.username === username) {
                return dispatch(push('/login'))
            }
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
        const language = getState().language.name;
        await axiosApi.delete('/users/sessions', {headers});
        dispatch(push('/login'));
        dispatch(logoutUser());
        notification.addNotification({
            title: (wordList[language].usersActions.logoutUserTitle),
            message: (wordList[language].usersActions.logoutUserMessage),
            ...config.notification
        });
    }
};