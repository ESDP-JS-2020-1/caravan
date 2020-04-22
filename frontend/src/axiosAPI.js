import axios from 'axios';
import {apiURL} from "./apiURL";

const axiosApi = axios.create({
    baseURL: apiURL
});

export default axiosApi;