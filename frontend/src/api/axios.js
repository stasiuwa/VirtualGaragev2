import axios from "axios";
const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: BASE_URL,
});

// api.interceptors.request.use((config) => {
//     const { authToken } = useAuth();
//     if (authToken?.token) {
//         config.headers['Authorization'] = `JWT ${authToken.token}`;
//     }
//     return config;
// }, error => { return Promise.reject(error); });

export default api;