import axiosApi from "../../axiosAPI";
import {push} from 'connected-react-router';
import {
    ADD_GROUP_FAILURE, ADD_GROUP_INIT,
    ADD_GROUP_SUCCESS,
    GET_GROUP_ERROR,
    GET_GROUP_SUCCESS,
    GET_GROUPS_ERROR,
    GET_GROUPS_SUCCESS, GET_PERMISSIONS_SUCCESS,
} from "./actionsTypes";
import {getUsers} from "./usersActions";
import {store as notification} from "react-notifications-component";
import config from "../../config";
import {wordList} from "../../wordList";

export const addGroupSuccess = () => ({type: ADD_GROUP_SUCCESS});
export const addGroupFailure = error => ({type: ADD_GROUP_FAILURE, error});

export const getPermissionsSuccess = permission => ({type: GET_PERMISSIONS_SUCCESS, permission});
export const getGroupsSuccess = groups => ({type: GET_GROUPS_SUCCESS, groups});
export const getGroupsError = error => ({type: GET_GROUPS_ERROR, error});

export const getGroupSuccess = group => ({type: GET_GROUP_SUCCESS, group});
export const getGroupError = error => ({type: GET_GROUP_ERROR, error});
export const addGroupInit = () => ({type: ADD_GROUP_INIT});

export const getPermissions = () => async dispatch => {
    const permissions = await axiosApi.get('/groups/permissions');

    dispatch(getPermissionsSuccess(permissions.data))
};

export const addNewGroup = group => async (dispatch, getState) => {
    try {
        const language = getState().language.name;
        await axiosApi.post('/groups', group);
        dispatch(addGroupSuccess());
        dispatch(push('/groups'));
        notification.addNotification({
            title: (wordList[language].groupActions.addGroupTitle),
            message: (wordList[language].groupActions.addGroupMessage),
            ...config.notification
        });
    } catch (e) {
        dispatch(addGroupFailure(e))
    }
};

export const getGroups = () => async dispatch => {
    try {
        const groups = await axiosApi.get('/groups');
        dispatch(getGroupsSuccess(groups.data))
    } catch (error) {
        dispatch(getGroupsError(error));
    }
};

export const getGroup = id => async dispatch => {
    try {
        const group = await axiosApi.get('/groups/' + id);
        dispatch(getGroupSuccess(group.data))
    } catch (error) {
        dispatch(getGroupError(error));
    }
};

export const editGroup = (data, id) => async dispatch => {
    try {
        await axiosApi.put('/groups/edit/' + id, data);
        dispatch(getGroup(id));
        dispatch(push('/groups/' + id));
        dispatch(addGroupSuccess())
    } catch (e) {
        dispatch(addGroupFailure(e))
    }
};

export const addUserToGroup = (idGroup, idUser) => async dispatch => {
    await axiosApi.put('/groups/' + idGroup, {list: [idUser]});
    dispatch(getGroup(idGroup));
    dispatch(getUsers());
};

export const deleteGroupUser = (id, idGroup) => async dispatch => {
    const data = {group: idGroup, user: id};
    await axiosApi.put('/groups/user/', data);

    dispatch(getGroup(idGroup));
};

export const deleteGroup = id => async dispatch => {
    await axiosApi.delete('/groups/' + id);
    dispatch(push('/groups'))
};