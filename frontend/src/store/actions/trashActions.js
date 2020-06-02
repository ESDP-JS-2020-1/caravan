import axiosApi from "../../axiosAPI";
import {GET_TRASH_FAILURE, GET_TRASH_REQUEST, GET_TRASH_SUCCESS} from "./actionsTypes";

export const getTrashRequest = () => ({type: GET_TRASH_REQUEST});
export const getTrashSuccess = trash => ({type: GET_TRASH_SUCCESS, trash});
export const getTrashFailure = error => ({type: GET_TRASH_FAILURE, error});

export const getTrash = () => async dispatch => {
    try {
        const trash = [];

        trash.push(axiosApi.get('/users/removed'))
        trash.push(axiosApi.get('/requests/removed'))
        trash.push(axiosApi.get('/products/removed'))
        trash.push(axiosApi.get('/groups/removed'))

        dispatch(getTrashRequest());

        const actualTrash = await Promise.all(trash);

        const data = actualTrash.map(data => data.data).flat();

        dispatch(getTrashSuccess(data));
    } catch (e) {
        dispatch(getTrashFailure(e))
    }
}