import httpClient from "./http-client.api";

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
}

export default new ManegementProductApis();