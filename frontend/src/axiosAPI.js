import axios from 'axios';
import {apiURL} from "./config";
import {store} from "./store/configureStore";

const axiosApi = axios.create({
    baseURL: apiURL.url
});

axiosApi.interceptors.request.use(config => {
    if(store.getState().users.user) {
        const token = store.getState().users.user.token;

        config.headers.Authorization = 'token ' + token;
    }
    return config;
});

export default axiosApi;