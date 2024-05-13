import axios from "../axios";

export const getAllCars = () => axios.get('/cars');
export const createCar = (carData) => axios.post('/cars', carData);
export const updateCar = (carID, carData) => axios.put(`/cars/${carID}`, carData);
export const deleteCar = (carID) => axios.delete(`/cars/${carID}`);
export const getCar = (carID) => axios.get(`/cars/${carID}`);