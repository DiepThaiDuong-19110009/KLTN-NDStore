import httpClient from "./http-client.api";

class authApis {
    async loginAdminApi({ email, password }) {
        return httpClient.httpPost(`api/login`, {
            email: email,
            password: password,
        });
    }
}

export default new authApis();