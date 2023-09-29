import axios from "axios";
import { API_URL_GHN } from "../common/common";

export const getProvince = () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Token': '2a390ca2-5d3b-11ee-b1d4-92b443b7a897'
    },
  }

  return axios.get(API_URL_GHN + '/province', config)
}

export const getDistrict = (provinceId) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Token': '2a390ca2-5d3b-11ee-b1d4-92b443b7a897'
    },
    data: { province_id: parseInt(provinceId) }
  }

  return axios.get(API_URL_GHN + `/district?province_id=${provinceId}`, config)
}

export const getWard = (districtId) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Token': '2a390ca2-5d3b-11ee-b1d4-92b443b7a897'
    },
    data: { district_id: parseInt(districtId) }
  }

  return axios.get(API_URL_GHN + `/ward?district_id=${districtId}`, config)
}

export const getServiceId = (to_district) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Token': '2a390ca2-5d3b-11ee-b1d4-92b443b7a897',
    },
  }

  return axios.post(`https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services`, {
    "shop_id": 189658,
    "from_district": 1451,
    "to_district": parseInt(to_district)
  }, config)
}

export const getLeadTime = (to_district_id, to_ward_code, service_id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Token': '2a390ca2-5d3b-11ee-b1d4-92b443b7a897',
      'ShopId': '189658'
    },
  }

  return axios.post(`https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime`, {
    "from_district_id": 1451,
    "from_ward_code": "20901",
    "to_district_id": parseInt(to_district_id),
    "to_ward_code": to_ward_code.toString(),
    "service_id": service_id
  }, config)
}

export const getFee = (to_province_id, to_district_id, to_ward_code) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Token': '2a390ca2-5d3b-11ee-b1d4-92b443b7a897',
      'ShopId': '189658'
    },
  }

  return axios.post(`https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`, {
    "service_type_id": 2,
    "from_province_id": 202,
    "from_district_id": 1451,
    "from_ward_code": "20901",
    "to_province_id": parseInt(to_province_id),
    "to_district_id": parseInt(to_district_id),
    "to_ward_code": to_ward_code.toString(),
    "weight": 1000
  }, config)
}