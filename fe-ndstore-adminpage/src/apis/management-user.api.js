import httpClient from "./http-client.api";

class ManegementUserApis {
    async getUserList(page, size, role, status, accountMail) {
        return httpClient.httpGet(`api/admin/manage/users/to/search/control/all?page=${page}&size=${size}&role=${role}&status=${status}&accountMail=${accountMail}`);
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