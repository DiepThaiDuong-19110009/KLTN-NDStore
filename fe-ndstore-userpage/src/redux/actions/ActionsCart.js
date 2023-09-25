import getCartProductUser from '../../apis/cart.api'
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const GET_ALL_PRODUCT = 'GET_ALL_PRODUCT';
export const GET_NUMBER_CART = 'GET_NUMBER_CART';
export const ADD_CART = 'ADD_CART' ;
export const UPDATE_CART = 'UPDATE_CART';
export const DELETE_CART = 'DELETE_CART';

export const actFetchProductsRequest = () => {
    return (dispatch) => {
        return getCartProductUser()?.then(res => {
            dispatch(GetAllCart(res?.data?.data?.items));
            dispatch(GetNumberCart(res?.data?.data?.totalProduct))
        });
    }
}


export function GetAllCart(payload){
    return{
        type:'GET_ALL_PRODUCT',
        payload
    }
}

export function GetNumberCart(payload){
    return{
        type:'GET_NUMBER_CART',
        payload
    }
}

export function AddCart(payload){
    return {
        type:'ADD_CART',
        payload
    }
}
export function UpdateCart(payload){
    return {
        type:'UPDATE_CART',
        payload
    }
}

export function DeleteCart(payload){
    return{
        type:'DELETE_CART',
        payload
    }
}

export function IncreaseQuantity(payload){
    return{
        type:'INCREASE_QUANTITY',
        payload
    }
}
export function DecreaseQuantity(payload){
    return{
        type:'DECREASE_QUANTITY',
        payload
    }
}