import httpClient from "./http-client.api";

class ManegementBrandApis {
    async getBrandList(page, size, state) {
        return httpClient.httpGet(`api/admin/manage/brands/get/list/all?page=${page}&size=${size}&state=${state}`);
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

    async editImageBrand(file, id) {
        if (!id || !file) {
            return;
        }
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        let formData = new FormData()
        formData.append('file', file);
        return httpClient.httpPost(`api/admin/manage/brand/update/new/image/${id}`, formData, config)
    }

    async editBrand(data, state, id) {
        if (!data || !state || !id) {
            return;
        }
        return httpClient.httpPut(`api/admin/manage/brands/update/detail/${id}`, {
            name: data.name,
            state: state
        })
    }
}

export default new ManegementBrandApis();