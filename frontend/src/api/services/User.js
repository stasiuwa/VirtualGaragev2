import axios from "../axios";

export const loginUser = (userData) => axios.post('/login', userData);
export const registerUser = (userData) => axios.post('/register', userData);