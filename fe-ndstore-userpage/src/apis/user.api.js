import axios from "axios";
import { API_URL } from "../common/common";

export const loginUser = (email, password) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return axios.post(API_URL + `/api/auth/login/account`, { email: email, password: password }, config)
}

export const registerUser = (name, email, password, phone, provinceId, districtId, wardId, address, gender) => {
  console.log(name, email, password, phone, address, gender, provinceId, districtId, wardId)
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return axios.post(API_URL + `/api/auth/register/account`, {
    name: name, email: email, password: password, phone: phone,
    province: parseInt(provinceId), district: parseInt(districtId), ward: parseInt(wardId), address: address, gender: gender
  }, config)
}

export const verifyUser = (email, otp) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return axios.post(API_URL + `/api/auth/verifyaccount/account`, { email: email, otp: otp, type: 'register' }, config)
}

export const resendOTP = (email) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return axios.post(API_URL + `/api/auth/mail/get/otp/account?email=${email}`, {}, config)
}

export const forgotPasswordUser = (email) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return axios.post(API_URL + `/api/auth/mail/forget/new/pass/account?email=${email}`, {}, config)
}

export const changePassword = (userId, oldPass, newPass) => {
  const token = localStorage.getItem('access-token')
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }

  return axios.put(API_URL + `/api/users/change/new/password/${userId}`, { oldPass: oldPass, newPass: newPass }, config)
}

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

  return axios.get(API_URL + `/api/users/get/profile/${userId}`, config)
}

export const updateProfileUser = (userId, name, phone, provinceId, districtId, wardId, address) => {
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

  return axios.put(API_URL + `/api/users/edit/information/profile/${userId}`, {
    name: name,
    phone: phone,
    province: parseInt(provinceId),
    district: parseInt(districtId),
    ward: parseInt(wardId),
    address: address
  }, config)
}

export const updateAvatar = (userId, selectedFile) => {
  const token = localStorage.getItem('access-token')
  if (!token || !userId) {
    return;
  }
  let formData = new FormData()
  formData.append('file', selectedFile);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    },
  }

  return axios.post(API_URL + `/api/users/update/avatar/${userId}`, formData, config)
}