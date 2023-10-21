import axios from "axios"
import { API_URL } from "../common/common"

export const checkout = (name, phone, address, provinceId, districtId, wardId, note, shipFee, estimatedTime, cartId, method) => {
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

  return axios.post(API_URL + `/api/checkout/${method}/${cartId}`, {
    "name": name,
    "phone": phone,
    "address": address,
    "province": provinceId.toString(),
    "district": districtId.toString(),
    "ward": wardId.toString(),
    "note": note,
    "shipFee": shipFee,
    "serviceType": 2,
    "estimatedTime": estimatedTime
  }, config)
}