import axios from "axios"
import { API_URL } from "../common/common"

// Find all product (page)
export const getProductByPage = (page) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return axios.get(API_URL + `/api/products/get/enable/list/all?page=${page}`, config)
}

// Find all product (no page)
export const getAllProductNoPage = () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return axios.get(API_URL + `/api/products/get/enable/list/find/all`, config)
}

// Find all product by category (page)
export const getProductByCategoryId = (page, idCategory) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return axios.get(API_URL + `/api/products/category/get/all/${idCategory}?page=${page}`, config)
}

// Find all product by brand (page)
export const getProductByBrandId = (page, idBrand) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return axios.get(API_URL + `/api/products/brand/get/all/${idBrand}?page=${page}`, config)
}

// Find product by key search
export const getProductByKeySearch = (page, content) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return axios.get(API_URL + `/api/products/find/get/search?content=${content}&page=${page}`, config)
}

// Get detail Product
export const getProductDetailById = (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return axios.get(API_URL + `/api/products/enable/${id}`, config)
}