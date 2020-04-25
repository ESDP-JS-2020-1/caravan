import {CREATE_PRODUCT_ERROR, CREATE_PRODUCT_INIT} from "../actions/productsActions";

const initialState = {
  error: null
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_INIT:
      return {...state, error: null}
    case CREATE_PRODUCT_ERROR:
      return {...state, error: action.error.response.data.message}
    default: return state
  }
};

export default productsReducer;