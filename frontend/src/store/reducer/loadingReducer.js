import {LOADING_START, LOADING_STOP} from "../actions/actionsTypes";


const initialState = {
    loading: false
};

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_START:
            return {...state, loading: true}
        case LOADING_STOP:
            return {...state, loading: false}
        default: return state;
    }
}

export default loadingReducer;