import {
  CREATE_PRODUCT_ERROR,
  CREATE_PRODUCT_INIT, GET_PRODUCTS_ERROR,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS
} from "../actions/productsActions";

const initialState = {
  productsList: [],
  loading: false,
  error: null,
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
    default: return state
  }
};

export default productsReducer;