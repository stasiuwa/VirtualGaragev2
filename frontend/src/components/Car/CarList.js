import React, { useState } from "react";
import {Link} from "react-router-dom";

const CarList = (props) => {
    const [error, setError] = useState(null);
    return (
        <div>
            <h1>Lista Samochodów</h1>
            {error && <p>{error}</p>}
            <ol>
                {props.cars.map((car, carIndex) => (
                    <li key={car._id}>
                        <Link to={`/vGarage/myCars/${car._id}`}>
                            {car.brand} {car.model} {car.car_year} {car.engine} {car.mileage}
                        </Link>
                        <ul>
                            {car.posts.map((item, index) => (
                                <li key={index}>
                                    <Link to={`/vGarage/myCars/${car._id}/posts/${index}`}>
                                        {item.type} {item.date} {item.mileage} {item.details} {item.price}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default CarList;