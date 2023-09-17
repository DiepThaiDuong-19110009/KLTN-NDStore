import axios from "axios"
import { API_URL } from "../common/common"

export const getCategoryAll = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  
    return axios.get(API_URL + `/api/categories/user/get/all`, config)
  }