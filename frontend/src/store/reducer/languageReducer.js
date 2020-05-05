import {SET_LANGUAGE_SUCCESS} from "../actions/actionsTypes";

const initialState = {
    name: 'ru'
};

const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LANGUAGE_SUCCESS:
            return {...state, name: action.name}
        default: return state;
    }
};

export default languageReducer;