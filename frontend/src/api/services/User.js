import axios from "../axios";

export const loginUser = async (data) => {
    return await axios.post('/users/login', data, {withCredentials: true});
}
export const registerUser = (userData) => axios.post('/register', userData);