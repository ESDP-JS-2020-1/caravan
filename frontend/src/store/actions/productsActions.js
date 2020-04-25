import axiosApi from "../../axiosAPI";

export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_ERROR = 'CREATE_PRODUCT_ERROR';

export const createProductRequest = () => ({type: CREATE_PRODUCT_REQUEST});
export const createProductSuccess = () => ({type: CREATE_PRODUCT_SUCCESS});
export const createProductError = error => ({type: CREATE_PRODUCT_ERROR, error});

export const addNewProduct = productData => async (dispatch) => {
  try {
    dispatch(createProductRequest())
    await axiosApi.post('/products', productData);

    dispatch(createProductSuccess())
  } catch (error) {
    dispatch(createProductError(error))
  }
};