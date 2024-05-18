import axios from "axios";
const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// interceptor do przekierowywania w przypadku statusów 401 i 404
api.interceptors.response.use( function(response) {
        return response;
    }, function(error) {
        if (error.response && error.response.status === 401) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)


export default api;