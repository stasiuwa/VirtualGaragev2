import React, {useState} from "react";
import {Link} from "react-router-dom";

const CarList = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    const indexOfFirstCar = (currentPage - 1) * perPage;
    const indexOfLastCar = indexOfFirstCar + perPage;
    const currentCars = props.data.cars.slice(indexOfFirstCar, indexOfLastCar);

    return (
        <div>
            <div>
                <button onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}>
                    Poprzednia strona
                </button>
                <button onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={indexOfLastCar >= props.data.cars.length}>
                    Następna strona
                </button>
            </div>
            <ol>
                {currentCars.map((car) => (
                    <li key={car._id}>
                        <Link to={`/vGarage/myCars/${car._id}`}>
                            {car.brand} {car.model} {car.car_year} {car.engine} {car.mileage}
                        </Link>
                        <ul style={{ listStyleType: 'decimal' }}>
                            {car.posts.map((item, index) => (
                                <li key={index}>
                                    <Link to={`/vGarage/myCars/${car._id}/posts/${item._id}`}>
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