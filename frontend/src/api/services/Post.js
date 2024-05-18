import axios from "../axios";

export const getAllPosts = async (carID) => { return await axios.get(`/cars/${carID}/posts`);};
export const getPost = async (carID, postID) => { return await axios.get(`/cars/${carID}/posts/${postID}`);};
export const createPost = async (carID, postData) => { return await axios.post(`/cars/${carID}/posts`, postData);};
export const updatePost = async (carID, postID, postData) => { return await axios.put(`/cars/${carID}/posts/${postID}`, postData);};
export const deletePost = async (carID, postID) => { return await axios.delete(`/cars/${carID}/posts/${postID}`);};

