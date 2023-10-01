import http from '../http-common';

class HttpClientApi {
    formatErrors(errors) {
        if (errors && errors.response) {
            const response = errors.response.data ? errors.response.data : errors.response;
            return Promise.reject(response);
        } else return Promise.reject(errors);
    }

    async httpGet(
        url,
        config,
        finalizeHandler,
    ) {
        try {
            let response;
            try {
                response = await http.get(url, config);
            } finally {
                if (typeof finalizeHandler === 'function') finalizeHandler();
            }
            return Promise.resolve(response.data);
        } catch (error) {
            return await this.formatErrors(error);
        }
    }

    async httpPost(
        url,
        data,
        config,
        finalizeHandler,
    ) {
        try {
            let response;
            try {
                response = await http.post(url, data, config);
            } finally {
                if (typeof finalizeHandler === 'function') finalizeHandler();
            }
            return Promise.resolve(response.data);
        } catch (error) {
            return await this.formatErrors(error);
        }
    }

    async httpPut(
        url,
        data,
        config,
        finalizeHandler,
    ) {
        try {
            let response;
            try {
                response = await http.put(url, data, config);
            } finally {
                if (typeof finalizeHandler === 'function') finalizeHandler();
            }
            return Promise.resolve(response.data);
        } catch (error) {
            return await this.formatErrors(error);
        }
    }

    async httpPatch(
        url,
        data,
        config,
        finalizeHandler,
    ) {
        try {
            let response;
            try {
                response = await http.patch(url, data, config);
            } finally {
                if (typeof finalizeHandler === 'function') finalizeHandler();
            }
            return Promise.resolve(response.data);
        } catch (error) {
            return await this.formatErrors(error);
        }
    }

    async httpDelete(
        url,
        config,
        finalizeHandler,
    ) {
        try {
            let response;
            try {
                response = await http.delete(url, config);
            } finally {
                if (typeof finalizeHandler === 'function') finalizeHandler();
            }
            return Promise.resolve(response.data);
        } catch (error) {
            return await this.formatErrors(error);
        }
    }

    async httpRequest(config, finalizeHandler) {
        try {
            let response;
            try {
                response = await http.request(config);
            } finally {
                if (typeof finalizeHandler === 'function') finalizeHandler();
            }
            return Promise.resolve(response.data);
        } catch (error) {
            return await this.formatErrors(error);
        }
    }
}

export default new HttpClientApi();