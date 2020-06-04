import axiosApi from "../../axiosAPI";
import {GET_TRASH_FAILURE, GET_TRASH_REQUEST, GET_TRASH_SUCCESS} from "./actionsTypes";
import {push} from 'connected-react-router'

export const getTrashRequest = () => ({type: GET_TRASH_REQUEST});
export const getTrashSuccess = trash => ({type: GET_TRASH_SUCCESS, trash});
export const getTrashFailure = error => ({type: GET_TRASH_FAILURE, error});

export const getTrash = type => async dispatch => {
    try {
        const trash = [];

        if (type === 'all') {
            trash.push(axiosApi.get('/users/removed'))
            trash.push(axiosApi.get('/requests/removed'))
            trash.push(axiosApi.get('/products/removed'))
            trash.push(axiosApi.get('/groups/removed'))
        } else {
            dispatch(push(`/trash/${type || 'all'}`))
            trash.push(axiosApi.get(`/${type}/removed`))
        }

        dispatch(getTrashRequest());

        const actualTrash = await Promise.all(trash);

        let data = actualTrash.map(data => data.data).flat();

        data = data.sort((a, b) => {
            const c = new Date(a.date);
            const d = new Date(b.date);
            return d-c
        })

        dispatch(getTrashSuccess(data));
    } catch (e) {
        dispatch(getTrashFailure(e))
    }
}