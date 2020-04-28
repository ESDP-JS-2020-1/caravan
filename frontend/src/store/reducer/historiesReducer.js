import {GET_HISTORIES_SUCCESS} from "../actions/HistoriesActions";

const initialState = {
    historiesList: [],
};

const historiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HISTORIES_SUCCESS:
            return {...state, historiesList: action.histories};
        default: return state
    }
};

export default historiesReducer;