import httpClient from "./http-client.api";

class ManegementUserApis {
    async getUserList(page, size) {
        return httpClient.httpGet(`api/admin/manage/users/get/all?page=${page}&size=${size}`);
    }
}

export default new ManegementUserApis();