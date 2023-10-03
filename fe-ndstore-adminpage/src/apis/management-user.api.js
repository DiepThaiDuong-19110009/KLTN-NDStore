import httpClient from "./http-client.api";

class ManegementUserApis {
    async getUserList(page, size) {
        return httpClient.httpGet(`api/admin/manage/users/get/all/list?page=${page}&size=${size}`);
    }

    async setStatusUser(userId) {
        if (!userId) {
            return;
        }
        return httpClient.httpPut(`api/admin/manage/users/change/state/${userId}`)
    }

    async getDetailUser(userId) {
        if (!userId) {
            return;
        }
        return httpClient.httpGet(`api/admin/manage/users/find/profile/${userId}`)
    }
}

export default new ManegementUserApis();