import {
    CREATE_PRODUCT_ERROR,
    CREATE_PRODUCT_INIT, DELETE_PRODUCT_FAILURE, EDIT_PRODUCT_FAILURE,
    GET_PRODUCT_FAILURE,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCTS_ERROR,
    GET_PRODUCTS_SUCCESS
} from "../actions/actionsTypes";

const initialState = {
    productsList: [],
    error: null,
    editProduct: [],
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_SUCCESS:
            return {...state, productsList: action.products};
        case GET_PRODUCTS_ERROR:
            return {...state, error: action.error};
        case CREATE_PRODUCT_INIT:
            return {...state, error: null};
        case CREATE_PRODUCT_ERROR:
            return {...state, error: action.error.response.data};
        case GET_PRODUCT_SUCCESS:
            return {...state, editProduct: action.data};
        case GET_PRODUCT_FAILURE:
            return {...state, error: action.error};
        case EDIT_PRODUCT_FAILURE:
            return {...state, error: action.error};
        case DELETE_PRODUCT_FAILURE:
            return {...state, error: action.error};
        default:
            return state
    }
};

export default productsReducer;