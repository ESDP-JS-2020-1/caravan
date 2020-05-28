import {
    GET_GROUP_ERROR, GET_GROUP_REQUEST, GET_GROUP_SUCCESS,
    GET_GROUPS_ERROR, GET_GROUPS_REQUEST, GET_GROUPS_SUCCESS, GET_PERMISSIONS_SUCCESS,
} from "../actions/actionsTypes";

const initialState = {
    loading: false,
    error: null,
    groups: [],
    group: {},
    permissions: undefined
};

const groupReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_GROUPS_REQUEST:
            return {...state, loading: true};
        case GET_GROUPS_SUCCESS:
            return {...state, groups: action.groups, loading: false};
        case GET_GROUPS_ERROR:
            return {...state, error: action.error, loading: false};

        case GET_PERMISSIONS_SUCCESS:
            return {...state, permissions: action.permission};

        case GET_GROUP_REQUEST:
            return {...state, loading: true};
        case GET_GROUP_SUCCESS:
            return {...state, group: action.group, loading: false};
        case GET_GROUP_ERROR:
            return {...state, error: action.error, loading: false};
        default: return state
    }
};

export default groupReducer;