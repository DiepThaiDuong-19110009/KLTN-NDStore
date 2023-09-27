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