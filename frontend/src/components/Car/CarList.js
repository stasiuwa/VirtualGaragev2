import React, { useEffect, useState } from "react";
import { getAllCars, getCar, createCar, deleteCar, updateCar } from "../../api/services/Car";

const CarList = (props) => {
    // const [cars, setCars] = useState([]);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchCars = async () => {
    //         try {
    //             const response = await getAllCars();
    //             setCars(response.data);
    //         } catch (error) {
    //             setError(error.response ? error.response.data : error.message);
    //         }
    //     };
    //
    //     fetchCars();
    // }, [cars]);
    return (
        <div>
            <h1>Lista Samochodów</h1>
            {error && <p>{error}</p>}
            <ul>
                {props.cars.map(car => (
                    <li key={car._id}>{car.brand} {car.model}</li>
                ))}
            </ul>
        </div>
    );
}

export default CarList;