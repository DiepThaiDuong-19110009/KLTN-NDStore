import _ from 'lodash';
import { getLocalItem } from '../src/helpers/storage';
import { LOCAL_STORAGE } from '../src/contants/LocalStorage';
import axios from 'axios';

const getAccessTokenReset = () => {
    const userToken = getLocalItem(LOCAL_STORAGE.ACCESS_TOKEN);
    return !_.isUndefined(userToken) && !_.isNull(userToken) ? userToken : '';
};

let instance = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        'Content-type': 'application/json',
    },
});

instance.interceptors.request.use((config) => {
    const token = getAccessTokenReset();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const statusCode = error?.response?.status;
        // if (statusCode === 401) {
        //     store.dispatch({
        //         type: 'app/logout',
        //     });
        // }
        return Promise.reject(error?.response?.data);
    },
);

export default instance;