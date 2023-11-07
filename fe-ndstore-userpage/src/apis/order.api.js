import axios from "axios"
import { API_URL } from "../common/common"

export const getHistoryOrderUser = (page, size, state) => {
    const token = localStorage.getItem('access-token')
    if (!token) {
        return;
    }
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }

    return axios.get(API_URL + `/api/orders/get/list/user?page=${page}&size=${size}&state=${state}`, config)
}

export const getDetailOrderUser = (orderId) => {
    const token = localStorage.getItem('access-token')
    if (!token) {
        return;
    }
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }

    return axios.get(API_URL + `/api/orders/get/detail/${orderId}`, config)
}

export const cancelOrderUser = (orderId) => {
    const token = localStorage.getItem('access-token')
    if (!token) {
        return;
    }
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }

    return axios.put(API_URL + `/api/orders/cancel/${orderId}`, {}, config)
}

export const remakelOrderUser = (orderId, method) => {
    const token = localStorage.getItem('access-token')
    if (!token) {
        return;
    }
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }

    return axios.post(API_URL + `/api/checkout/remake/${method}/${orderId}`, {}, config)
}