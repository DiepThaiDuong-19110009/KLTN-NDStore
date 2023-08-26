import axios from "axios";

export const getProvince = () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Token': 'c95f1988-417a-11ee-b394-8ac29577e80e'
    },
  }

  return axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', config)
}

export const getDistrict = (provinceId) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Token': 'c95f1988-417a-11ee-b394-8ac29577e80e'
    },
    data: { province_id: parseInt(provinceId) }
  }

  return axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`, config)
}

export const getWard = (districtId) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Token': 'c95f1988-417a-11ee-b394-8ac29577e80e'
    },
    data: { district_id: parseInt(districtId) }
  }

  return axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`, config)
}

export const loginUser = (email, password) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return axios.post(`https://apingweb.com/api/login`, {email: email, password: password}, config)
}