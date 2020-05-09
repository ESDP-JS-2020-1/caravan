import axiosApi from "../../axiosAPI";

export const addNewGroup = group => async dispatch => {
    await axiosApi.post('/groups', group);
};