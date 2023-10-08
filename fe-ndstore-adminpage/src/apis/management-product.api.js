import httpClient from "./http-client.api";

class ManegementProductApis {
    async getProductList(page, size) {
        return httpClient.httpGet(`api/admin/manage/products/get/list?page=${page}&size=${size}&state=all`);
    }

    async setStatusProduct(userId) {
        if (!userId) {
            return;
        }
        return httpClient.httpPut(`api/admin/manage/users/change/state/${userId}`)
    }

    async getDetailProduct(userId) {
        if (!userId) {
            return;
        }
        return httpClient.httpGet(`api/admin/manage/users/find/profile/${userId}`)
    }
}

export default new ManegementProductApis();