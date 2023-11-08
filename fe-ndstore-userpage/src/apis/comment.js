import axios from "axios";
import { API_URL } from "../common/common";

export const getListComment = (page, productId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }

    return axios.get(API_URL + `/api/review/list/product/${productId}?page=${page}`, config)
}

export const createComment = (productId, description, vote) => {
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

    return axios.post(API_URL + `/api/review/content/create`, { productBuyId: productId, description: description, vote: vote }, config)
}