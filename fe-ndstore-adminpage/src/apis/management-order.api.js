import axios from "axios";
import httpClient from "./http-client.api";

class ManegementOrderApis {
    async getOrderList(page, size, state) {
        return httpClient.httpGet(`api/admin/manage/orders/get/all?page=${page}&size=${size}&state=${state}`);
    }

    async setStatusOrderToComplete(orderId) {
        if (!orderId) {
            return;
        }
        return httpClient.httpPut(`api/admin/manage/orders/complete/${orderId}`)
    }

    async setStatusOrderToDelivery(orderId, estimatedDeliveryTime) {
        if (!orderId) {
            return;
        }
        return httpClient.httpPut(`api/admin/manage/orders/ship/${orderId}?estimatedDeliveryTime=${estimatedDeliveryTime}`)
    }

    async setStatusOrderToCancel(orderId) {
        if (!orderId) {
            return;
        }
        return httpClient.httpPut(`api/admin/manage/orders/set/cancel/${orderId}`)
    }

    // async getListProvince() {
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Token': '2a390ca2-5d3b-11ee-b1d4-92b443b7a897',
    //         },
    //     }
    //     return axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`, config)
    // }

    // async getListDistrict(idProvince) {
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Token': '2a390ca2-5d3b-11ee-b1d4-92b443b7a897',
    //         },
    //         data: { province_id: parseInt(idProvince) }
    //     }
    //     return axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${idProvince}`, config)
    // }

    // async getListWard(idDistrict) {
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Token': '2a390ca2-5d3b-11ee-b1d4-92b443b7a897',
    //         },
    //         data: { district_id: parseInt(idDistrict) }
    //     }
    //     return axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${idDistrict}`, config)
    // }

    async getOrderDetail(orderId) {
        if (!orderId) {
            return;
        }
        return httpClient.httpGet(`api/admin/manage/orders/get/detail/${orderId}`)
    }

    async createOrderForGHN(customerInfo, productList) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': '2a390ca2-5d3b-11ee-b1d4-92b443b7a897',
                'ShopId': '189658'
            },
        }

        return axios.post(`https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create`, {
            payment_type_id: 2,
            required_note: "CHOTHUHANG",
            from_name: "ND Store",
            from_phone: "0939816390",
            from_address: "123, Lê Văn Việt",
            from_ward_name: "Hiệp Phú",
            from_district_name: "Thành Phố Thủ Đức",
            from_province_name: "HCM",
            // infor customer
            to_name: customerInfo?.customerName,
            to_phone: customerInfo?.customerPhone,
            to_address: customerInfo?.customerAddress,
            to_ward_name: customerInfo?.customerWard,
            to_district_name: customerInfo?.customerDistrict,
            to_province_name: customerInfo?.customerProvince,
            // 
            weight: 2000,
            length: 1,
            width: 19,
            height: 10,
            service_type_id: 2,
            // Item list
            items: productList,
        }, config)
    }
}

export default new ManegementOrderApis();