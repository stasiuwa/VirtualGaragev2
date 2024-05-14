import React, { useEffect, useState } from "react";
import { getAllCars, getCar, createCar, deleteCar, updateCar } from "../../api/services/Car";
import {useAuth} from "../../api/auth";

function CarList() {
    const [cars, setCars] = useState([]);
    const [error, setError] = useState(null);

    const { authToken } = useAuth();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                console.log("authToken: " + authToken)
                const response = await getAllCars({
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                setCars(response.data);
            } catch (error) {
                setError(error.response ? error.response.data : error.message);
            }
        };

        fetchCars();
    }, [authToken]);

    return (
        <div>
            <h1>Lista Samochodów</h1>
            {error && <p>{error}</p>}
            <ul>
                {cars.map(car => (
                    <li key={car._id}>{car.brand} {car.model}</li>
                ))}
            </ul>
        </div>
    );
}

export default CarList;