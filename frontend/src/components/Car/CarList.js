import React, { useState } from "react";
import { getAllCars, getCar, createCar, deleteCar, updateCar } from "../../api/services/Car";

const CarList = (props) => {
    const [error, setError] = useState(null);
    return (
        <div>
            <h1>Lista Samochodów</h1>
            {error && <p>{error}</p>}
            <ul>
                {props.cars.map(car => (
                    <li key={car._id}>
                        {car.brand} {car.model} {car.car_year} {car.engine} {car.mileage} {car.posts}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CarList;