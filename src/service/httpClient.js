import axios from 'axios';

export default class HttpClient {
    constructor({ baseURL, headers = {} } = {}) {
        this.client = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });
    }

    async get(url, config = {}) {
        const response = await this.client.get(url, config);
        return response.data;
    }

    async post(url, data = {}, config = {}) {
        const response = await this.client.post(url, data, config);
        return response.data;
    }

}
