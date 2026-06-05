import HttpClient from './httpClient';

class FinanceiroService {
    constructor() {
        this.http = new HttpClient({
            baseURL: process.env.VUE_APP_FINANCEIRO_API_URL,
        });
    }

    getTransferencias(params = {}) {
        return this.http.get('/transferencias', { params });
    }

    createTransferencia(data) {
        return this.http.post('/transferencias', data);
    }

}

export default new FinanceiroService();
