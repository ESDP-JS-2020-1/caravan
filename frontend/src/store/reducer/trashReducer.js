import {GET_TRASH_FAILURE, GET_TRASH_SUCCESS} from "../actions/actionsTypes";

const INITIAL_STATE = {
    trash: null,
    error: null
};

const trashReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TRASH_SUCCESS:
            return {...state, trash: action.trash};
        case GET_TRASH_FAILURE:
            return {...state, error: action.error};
        default:
            return state
    }
};

export default trashReducer;