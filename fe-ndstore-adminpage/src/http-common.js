import _ from 'lodash';
import { clearLocal, getLocalItem } from '../src/helpers/storage';
import { LOCAL_STORAGE } from '../src/contants/LocalStorage';
import axios from 'axios';
import { API_URL } from './environment';
import { Navigate } from 'react-router-dom';

const getAccessTokenReset = () => {
    const userToken = getLocalItem(LOCAL_STORAGE.ACCESS_TOKEN);
    return !_.isUndefined(userToken) && !_.isNull(userToken) ? userToken : '';
};

let instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-type': 'application/json',
    },
});

instance.interceptors.request.use((config) => {
    const token = getAccessTokenReset();
    if (token) {
        config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
    }
    return config;
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const statusCode = error?.response?.status;
        if (statusCode === 401) {
            clearLocal()
            Navigate('/login')
        }
        return Promise.reject(error?.response?.data);
    },
);

export default instance;