import axios from "../axios";

export const loginUser = async (data) => {
    return await axios.post('/users/login', data);
}
export const logoutUser = async () => {
    return await axios.get('/users/logout');
}
export const registerUser = async (userData) => {
    return await axios.post('/users/register', userData);
}
export const getUser = async () =>  {
    return await axios.get('/users/profile');
}