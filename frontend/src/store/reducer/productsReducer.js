import {
  CREATE_PRODUCT_ERROR,
  CREATE_PRODUCT_INIT, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, EDIT_PRODUCT_FAILURE,
  EDIT_PRODUCT_REQUEST, EDIT_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS
} from "../actions/actionsTypes";

const initialState = {
  productsList: [],
  loading: false,
  error: null,
  editProduct:null,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return {...state, loading: true};
    case GET_PRODUCTS_SUCCESS:
      return {...state, productsList: action.products, loading: false};
    case GET_PRODUCTS_ERROR:
      return {...state, error: action.error, loading: false};
    case CREATE_PRODUCT_INIT:
      return {...state, error: null};
    case CREATE_PRODUCT_ERROR:
      return {...state, error: action.error.response.data.message};
    case GET_PRODUCT_REQUEST:
      return{...state,loading: true};
    case GET_PRODUCT_SUCCESS:
      return{...state,editProduct: action.data,loading: false};
    case GET_PRODUCT_FAILURE:
      return {...state,error:action.error,loading: false};
    case EDIT_PRODUCT_REQUEST:
      return{...state,loading: true};
    case EDIT_PRODUCT_SUCCESS:
      return{...state,loading: false};
    case EDIT_PRODUCT_FAILURE:
      return {...state,loading: false,error:action.error};
    case DELETE_PRODUCT_REQUEST:
      return{...state,loading: true};
    case DELETE_PRODUCT_SUCCESS:
      return{...state,loading: false};
    case DELETE_PRODUCT_FAILURE:
      return {...state,loading: false,error:action.error};
    default: return state
  }
};

export default productsReducer;