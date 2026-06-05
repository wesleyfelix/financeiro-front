import HttpClient from './HttpClient';

class UserService {
    constructor() {
        this.http = new HttpClient({
            baseURL: process.env.VUE_APP_FINANCEIRO_API_URL,
        });
    }

    getUsers(params = {}) {
        return this.http.get('/transferencias', { params });
    }

    createUser(data) {
        return this.http.post('/transferencias', data);
    }

}

export default new UserService();
