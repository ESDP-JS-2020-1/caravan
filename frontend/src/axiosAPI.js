import axios from 'axios';
import {apiURL} from "./config";
import {store} from "./store/configureStore";
import {loadingStart, loadingStop} from "./store/actions/loadingActions";

const axiosApi = axios.create({
    baseURL: apiURL.url
});

const {dispatch} = store;

axiosApi.interceptors.request.use(config => {
    dispatch(loadingStart())

    if (store.getState().users.user) {
        const token = store.getState().users.user.token;

        config.headers.Authorization = 'token ' + token;
    }
    return config;
});


axiosApi.interceptors.response.use(config => {
    dispatch(loadingStop());

    return config;
});
export default axiosApi;