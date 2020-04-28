import {push} from 'connected-react-router';
import axiosApi from "../../axiosAPI";
import {store as notification} from "react-notifications-component";
import config from "../../config";

export const CREATE_REQUEST_INIT = 'CREATE_REQUEST_INIT';
export const CREATE_REQUEST_SUCCESS = 'CREATE_REQUEST_SUCCESS';
export const CREATE_REQUEST_ERROR = 'CREATE_REQUEST_ERROR';

export const createRequestInit = () => ({type: CREATE_REQUEST_INIT});
export const createRequestSuccess = () => ({type: CREATE_REQUEST_SUCCESS});
export const createRequestError = error => ({type: CREATE_REQUEST_ERROR, error});

export const createRequest = requestData => {
	return async (dispatch) => {
		try {
			await axiosApi.post('/requests', requestData);

			dispatch(createRequestSuccess());
			notification.addNotification({
				title: 'Создание заявки',
				message: `Заявка создана успешно`,
				...config.notification
			});
			dispatch(push('/'));
		} catch (e) {
			dispatch(createRequestError(e));
		}
	}
};