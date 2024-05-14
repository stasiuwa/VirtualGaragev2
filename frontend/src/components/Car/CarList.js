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
                    <div key={car._id}>
                        <li key={car._id}>
                            {car.brand} {car.model} {car.car_year} {car.engine} {car.mileage}
                            <ul key={car._id + "_posts"}>
                                {car.posts.map((item, index) => (
                                    <li key={index}>{item.type} {item.date} {item.mileage} {item.details} {item.price}</li>
                                ))}
                            </ul>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default CarList;