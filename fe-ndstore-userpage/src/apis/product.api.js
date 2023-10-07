import axios from "axios"
import { API_URL } from "../common/common"

// Find all product (page)
export const getProductByPage = (page, size) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return axios.get(API_URL + `/api/products/get/enable/list/all?page=${page}?size=${size}`, config)
}

// Find all product (page)
export const getProductByCategoryId = (page, size) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return axios.get(API_URL + `/api/products/get/enable/list/all?page=${page}?size=${size}`, config)
}

export const getProductDetailById = (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return axios.get(API_URL + `/api/products/enable/${id}`, config)
}