import axios from "axios";
import httpClient from "./http-client.api";
import { API_URL } from "../environment";

class ManegementProductApis {
    async getProductList(page, size) {
        return httpClient.httpGet(`api/admin/manage/products/get/all/list?page=${page}&size=${size}`);
    }

    async setStatusProduct(productId) {
        if (!productId) {
            return;
        }
        return httpClient.httpPut(`api/admin/manage/products/change/state/${productId}`)
    }

    async getDetailProduct(productId) {
        if (!productId) {
            return;
        }
        return httpClient.httpGet(`api/admin/manage/products/get/detail/${productId}`)
    }

    async createNewProduct(data) {
        if (!data) {
            return;
        }
        return httpClient.httpPost(`api/admin/manage/product/create`, data)
    }

    async editProduct(data, id) {
        if (!data || !id) {
            return;
        }
        return httpClient.httpPut(`api/admin/manage/products/detail/update/${id}`, data)
    }

    async editConfigProduct(data, id) {
        if (!data || !id) {
            return;
        }
        const configProduct = [data]
        return httpClient.httpPut(`api/admin/manage/products/update/config/${id}`, configProduct)
    }

    async addImageProduct(file, id) {
        if (!id || !file) {
            return;
        }
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        let formData = new FormData()
        formData.append('files', file);
        return httpClient.httpPost(`api/admin/manage/products/add/new/images/${id}`, formData, config)
    }

    async deleteImageProduct(idImage, id) {
        console.log({ image_Id: idImage })
        if (!idImage || !id) {
            return;
        }
        return httpClient.httpDelete(`api/admin/manage/products/delete/detail/${id}/${idImage}`)
    }
}

export default new ManegementProductApis();