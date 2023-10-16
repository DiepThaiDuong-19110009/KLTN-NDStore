import httpClient from "./http-client.api";

class ManegementCategoryApis {
    async getCategoryList(page, size, state) {
        return httpClient.httpGet(`api/admin/manage/categories/get/list/all?page=${page}&size=${size}&state=${state}`);
    }

    async setStatusCategoryToEnable(categoryId) {
        if (!categoryId) {
            return;
        }
        return httpClient.httpPut(`api/admin/manage/categories/change/enable/${categoryId}`)
    }

    async setStatusCategoryToDisable(categoryId) {
        if (!categoryId) {
            return;
        }
        return httpClient.httpPut(`api/admin/manage/categories/change/disable/${categoryId}`)
    }

    async getDetailCategory(categoryId) {
        if (!categoryId) {
            return;
        }
        return httpClient.httpGet(`api/admin/manage/categories/get/details/${categoryId}`)
    }

    async createNewCategory(data) {
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
        return httpClient.httpPost(`api/admin/manage/create/new/categories`, formData, config)
    }

    async editImageCategory(file, id) {
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
        return httpClient.httpPost(`api/admin/manage/categories/update/new/image/${id}`, formData, config)
    }

    async editCategory(data, state, id) {
        if (!data || !state || !id) {
            return;
        }
        return httpClient.httpPut(`api/admin/manage/categories/update/details/${id}`, {
            name: data.name,
            state: state
        })
    }
}

export default new ManegementCategoryApis();