import {GET_PRODUCT_STATISTIC_SUCCESS, GET_USER_STATISTIC_SUCCESS} from "../actions/actionsTypes";

const initialState = {
    productStatistic: null,
    userStatistic: null
};

const statisticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_STATISTIC_SUCCESS:
            return {...state, productStatistic: action.productStatistic};
        case GET_USER_STATISTIC_SUCCESS:
            return {...state, userStatistic: action.userStatistic};
        default:
            return state
    }
};

export default statisticsReducer;