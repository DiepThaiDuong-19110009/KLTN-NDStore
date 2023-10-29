import axios from "axios"
import { API_URL } from "../common/common"

export const getAllBrandNoPage = () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return axios.get(API_URL + `/api/brands/get/all`, config)
}