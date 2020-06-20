import {GET_STATISTIC_SUCCESS, STATISTIC_INIT} from "../actions/actionsTypes";

const initialState = {
    statistic: null,
};

const statisticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STATISTIC_SUCCESS:
            return {...state, statistic: action.productStatistic};
        case STATISTIC_INIT:
            return {...state, statistic: null}
        default:
            return state
    }
};

export default statisticsReducer;