import axios from "../axios";

export const getAllPosts = (carID) => axios.get(`/cars/${carID}/posts`);
export const createPost = (carID, postData) => axios.post(`/cars/${carID}/posts`);
export const updatePost = (carID, postID, postData) => axios.put(`/cars/${carID}/posts/${postID}`);
export const deletePost = (carID, postID) => axios.delete(`/cars/${carID}/posts/${postID}`);

