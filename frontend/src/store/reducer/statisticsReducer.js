import {GET_STATISTIC_SUCCESS} from "../actions/actionsTypes";

const initialState = {
    statistics: [],
};

const statisticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STATISTIC_SUCCESS:
            return {...state, statistics: action.statistics};
        default:
            return state
    }
};

export default statisticsReducer;