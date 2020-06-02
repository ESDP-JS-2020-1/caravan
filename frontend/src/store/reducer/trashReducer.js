import {GET_TRASH_FAILURE, GET_TRASH_REQUEST, GET_TRASH_SUCCESS} from "../actions/actionsTypes";

const INITIAL_STATE = {
    loading: false,
    trash: null,
    error: null
}

const trashReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TRASH_REQUEST:
            return {...state, loading: true};
        case GET_TRASH_SUCCESS:
            return {...state, trash: action.trash, loading: false}
        case GET_TRASH_FAILURE:
            return {...state, error: action.error, loading: false}
        default: return state
    }
};

export default trashReducer;