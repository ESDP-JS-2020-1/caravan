import {
    ADD_GROUP_FAILURE, ADD_GROUP_INIT,
    GET_GROUP_ERROR, GET_GROUP_SUCCESS,
    GET_GROUPS_ERROR, GET_GROUPS_SUCCESS, GET_PERMISSIONS_SUCCESS,
} from "../actions/actionsTypes";

const initialState = {
    error: null,
    groups: [],
    group: {},
    permissions: undefined
};

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_GROUP_FAILURE:
            return {...state, error: action.error.response.data.message};
        case GET_GROUPS_SUCCESS:
            return {...state, groups: action.groups};
        case GET_GROUPS_ERROR:
            return {...state, error: action.error};
        case ADD_GROUP_INIT:
            return {...state, error: null};

        case GET_PERMISSIONS_SUCCESS:
            return {...state, permissions: action.permission};
        case GET_GROUP_SUCCESS:
            return {...state, group: action.group};
        case GET_GROUP_ERROR:
            return {...state, error: action.error};
        default:
            return state
    }
};

export default groupReducer;