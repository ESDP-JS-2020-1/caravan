import axios from 'axios';
import {apiURL} from "./config";
import {store} from "./store/configureStore";
import {loadingStart, loadingStop} from "./store/actions/loadingActions";

const {dispatch} = store;

const axiosApi = axios.create({
    baseURL: apiURL.url
});

const errorHandler = error => {
    dispatch(loadingStop());
    return Promise.reject(error)
}

axiosApi.interceptors.request.use(config => {
    dispatch(loadingStart())

    if (store.getState().users.user) {
        const token = store.getState().users.user.token;
        config.headers.Authorization = 'token ' + token;
    }
    return config;
}, errorHandler);


axiosApi.interceptors.response.use(config => {
    dispatch(loadingStop());
    return config;
}, errorHandler);
export default axiosApi;