import { LOCAL_STORAGE } from "../contants/LocalStorage";
import { clearLocal, getLocalItem } from "../helpers/storage";
import httpClient from "./http-client.api";

class AuthApis {
    async loginAdminApi({ email, password }) {
        return httpClient.httpPost(`api/auth/login/account`, {
            email: email,
            password: password,
        });
    }

    async getProfile() {
        const userId = JSON.parse(getLocalItem(LOCAL_STORAGE.USER_INFOR))?.id
        if (!userId) {
            clearLocal();
            return;
        }
        return httpClient.httpGet(`api/admin/manage/users/get/check/profile/${userId}`)
    }
}

export default new AuthApis();