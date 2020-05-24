import axiosApi from "../../axiosAPI";
import {push} from 'connected-react-router';
import {
    GET_GROUP_ERROR,
    GET_GROUP_REQUEST,
    GET_GROUP_SUCCESS,
    GET_GROUPS_ERROR,
    GET_GROUPS_REQUEST,
    GET_GROUPS_SUCCESS,
} from "./actionsTypes";
import {getUsers} from "./usersActions";
import {store as notification} from "react-notifications-component";
import config from "../../config";

const getGroupsRequest = () => ({type: GET_GROUPS_REQUEST});
const getGroupsSuccess = groups => ({type: GET_GROUPS_SUCCESS, groups });
const getGroupsError = error => ({type: GET_GROUPS_ERROR, error});

const getGroupRequest = () => ({type: GET_GROUP_REQUEST});
const getGroupSuccess = group => ({type: GET_GROUP_SUCCESS, group });
const getGroupError = error => ({type: GET_GROUP_ERROR, error});

export const addNewGroup = group => async dispatch => {
    await axiosApi.post('/groups', group);
    dispatch(push('/groups'))

    notification.addNotification({
        title: "Добавление группы",
        message: "Группа успешно обавлена!",
        ...config.notification
    });
};

export const getGroups = () => async dispatch => {
    try {
        dispatch(getGroupsRequest());
        const groups  = await axiosApi.get('/groups');
        dispatch(getGroupsSuccess(groups.data))
    } catch (error) {
        dispatch(getGroupsError(error));
    }
};

export const getGroup = id => async dispatch => {
    try {
        dispatch(getGroupRequest());
        const group  = await axiosApi.get('/groups/'+id);
        dispatch(getGroupSuccess(group.data))
    } catch (error) {
        dispatch(getGroupError(error));
    }
};

export const editGroup = (data, id) => async dispatch => {
    await axiosApi.put('/groups/edit/'+id, data);

    dispatch(getGroup(id));
    dispatch(push('/groups/'+id));
};

export const addUserToGroup = (idGroup, idUser) => async dispatch => {
    await axiosApi.put('/groups/'+idGroup, {list: [idUser]});

    dispatch(getGroup(idGroup));
    dispatch(getUsers());
};

export const deleteGroupUser = (id, idGroup) => async dispatch => {
    const data = {group: idGroup, user: id};
    await  axiosApi.put('/groups/user/', data);

    dispatch(getGroup(idGroup));
};

export const deleteGroup = id => async dispatch => {
  await  axiosApi.delete('/groups/'+id);

  dispatch(push('/groups'))
};