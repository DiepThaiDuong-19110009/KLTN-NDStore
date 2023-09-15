import axios from "axios";
import { API_URL, API_URL_GHN } from "../common/common";

export const getProvince = () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Token': 'c95f1988-417a-11ee-b394-8ac29577e80e'
    },
  }

  return axios.get(API_URL_GHN + '/province', config)
}

export const getDistrict = (provinceId) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Token': 'c95f1988-417a-11ee-b394-8ac29577e80e'
    },
    data: { province_id: parseInt(provinceId) }
  }

  return axios.get(API_URL_GHN + `/district?province_id=${provinceId}`, config)
}

export const getWard = (districtId) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Token': 'c95f1988-417a-11ee-b394-8ac29577e80e'
    },
    data: { district_id: parseInt(districtId) }
  }

  return axios.get(API_URL_GHN + `/ward?district_id=${districtId}`, config)
}

export const loginUser = (email, password) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return axios.post( API_URL + `/api/auth/login/account`, {email: email, password: password}, config)
}

export const registerUser = (name, email, password, phone, provinceId, districtId, wardId, address, gender) => {
  console.log(name, email, password, phone, address, gender, provinceId, districtId, wardId)
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return axios.post( API_URL + `/api/auth/register/account`, {name: name, email: email, password: password, phone: phone,
    province: parseInt(provinceId), district: parseInt(districtId), ward: parseInt(wardId), address: address, gender: gender}, config)
}

export const verifyUser = (email, otp) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return axios.post( API_URL + `/api/auth/verifyaccount/account`, {email: email, otp: otp, type: 'register'}, config)
}

export const resendOTP = (email) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return axios.post( API_URL + `/api/auth/mail/get/otp/account?email=${email}`, {}, config)
}

export const forgotPasswordUser = (email) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return axios.post( API_URL + `/api/auth/mail/forget/new/pass/account?email=${email}`, {}, config)
}

export const changePassword = () => {}

export const getProfileUser = (userId) => {
  const token = localStorage.getItem('access-token')
  if (!token || !userId) {
    return;
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }

  return axios.get( API_URL + `/api/users/get/profile/${userId}`, config)
}