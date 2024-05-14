import axios from "../axios";
export const getAllCars = async (token) => {
    return await axios.get("/cars", { withCredentials: true });
};
export const createCar = (carData) => axios.post('/cars', carData,{withCredentials: true});
export const updateCar = (carID, carData) => axios.put(`/cars/${carID}`, carData,{withCredentials: true});
export const deleteCar = (carID) => axios.delete(`/cars/${carID}`, {withCredentials: true});
export const getCar = (carID) => axios.get(`/cars/${carID}`, {withCredentials: true});