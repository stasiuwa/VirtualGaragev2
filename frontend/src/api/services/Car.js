import axios from "../axios";
export const getAllCars = async () => { return await axios.get("/cars"); };
export const createCar = async (carData) => { return await axios.post('/cars', carData); };
export const updateCar = async (carID, carData) => { return await axios.put(`/cars/${carID}`, carData); };
export const deleteCar = async (carID) => { return await axios.delete(`/cars/${carID}`); };
export const getCar = async (carID) => { return await axios.get(`/cars/${carID}`); };