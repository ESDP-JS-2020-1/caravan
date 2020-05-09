import axiosApi from "../../axiosAPI";
import {push} from 'connected-react-router';
import {
    GET_GROUPS_REQUEST,
    GET_GROUPS_SUCCESS,
    GET_GROUPS_ERROR,

    GET_GROUP_REQUEST,
    GET_GROUP_SUCCESS,
    GET_GROUP_ERROR,
} from "./actionsTypes";
import {getUsers} from "./usersActions";

const getGroupsRequest = () => ({type: GET_GROUPS_REQUEST});
const getGroupsSuccess = groups => ({type: GET_GROUPS_SUCCESS, groups });
const getGroupsError = error => ({type: GET_GROUPS_ERROR, error});

const getGroupRequest = () => ({type: GET_GROUP_REQUEST});
const getGroupSuccess = group => ({type: GET_GROUP_SUCCESS, group });
const getGroupError = error => ({type: GET_GROUP_ERROR, error});

export const addNewGroup = group => async dispatch => {
    await axiosApi.post('/groups', group);
    dispatch(push('/groups'))
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

export const addUserToGroup = (idGroup, idUser) => async dispatch => {
    await axiosApi.put('/groups/'+idGroup, {list: [idUser]});

    dispatch(getGroup(idGroup));
    dispatch(getUsers());
};