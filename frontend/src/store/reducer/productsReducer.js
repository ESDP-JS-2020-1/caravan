import {CREATE_PRODUCT_ERROR} from "../actions/productsActions";

const initialState = {
  error: null
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_ERROR:
      return {...state, error: action.error}
    default: return state
  }
};

export default productsReducer;