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

// Filter product when have filter item
// Find product by key search
export const filterProductByKeySearch = (page, keyword, brandId, priceMin, priceMax) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return axios.get(API_URL +
     `/api/products/find/search/brand/fill/full/all/enable/price/config?keyword=${keyword}&page=${page}&priceMax=${priceMax}&priceMin=${priceMin}&brandId=${brandId}`, config)
}

// Filter product with category id + brand id + price + config
export const filterProductLaptop = (page, categoryId, brandId, priceMin, priceMax, RAM, CPU, PIN, CHIP, IPS, USB) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  let params = {
    "brandId": brandId,
    "RAM": RAM,
    "CPU": CPU,
    "PIN": PIN,
    "CHIP": CHIP,
    "IPS": IPS,
    "USB": USB
  };

  let query = Object.keys(params).map((k) => {
    if (params[k] !== "") {
      return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
    }
  }).join('&')

  console.log(query)

  return axios.get(API_URL + `/api/products/find/filter/category/search/list/config?categoryId=${categoryId}&priceMin=${priceMin}&priceMax=${priceMax}&page=${page}&${query}`, config)
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