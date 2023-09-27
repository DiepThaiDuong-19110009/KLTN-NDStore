import axios from "axios"
import { API_URL } from "../common/common"


export default function getCartProductUser() {
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
  
    return axios.get( API_URL + `/api/cart/get/all`, config)
}
 
export const addProductToCart = (productId, quantity) => {
    const token = localStorage.getItem('access-token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }
  
    return axios.post( API_URL + `/api/cart/put`, {productId: productId, quantity: quantity}, config)
}

export const removeItemCart = (cartItemId) => {
  const token = localStorage.getItem('access-token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }
  
    return axios.delete( API_URL + `/api/cart/remove/${cartItemId}`, config)
} 