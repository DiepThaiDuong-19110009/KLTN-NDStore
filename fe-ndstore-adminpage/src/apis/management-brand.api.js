import httpClient from "./http-client.api";

class ManegementBrandApis {
    async getBrandList(page, size) {
        return httpClient.httpGet(`api/admin/manage/brands/get/list/all?page=${page}&size=${size}`);
    }

    async setStatusBrandToEnable(brandId) {
        if (!brandId) {
            return;
        }
        return httpClient.httpPut(`api/admin/manage/brands/enable/${brandId}`)
    }

    async setStatusBrandToDisable(brandId) {
        if (!brandId) {
            return;
        }
        return httpClient.httpPut(`api/admin/manage/brands/disable/${brandId}`)
    }

    async getDetailBrand(brandId) {
        if (!brandId) {
            return;
        }
        return httpClient.httpGet(`api/admin/manage/brands/detail/${brandId}`)
    }

    async createNewBrand(data) {
        if (!data) {
            return;
        }
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        let formData = new FormData()
        formData.append('file', data.file);
        formData.append('name', data.name);
        return httpClient.httpPost(`api/admin/manage/brands/add/new`, formData, config)
    }
}

export default new ManegementBrandApis();