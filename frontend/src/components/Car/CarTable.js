import React, {useState} from "react";
import {Link} from "react-router-dom";

const CarTable = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(15);

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
            <table>
                <thead>
                <tr>
                    <th>Marka</th>
                    <th>Model</th>
                    <th>Rok</th>
                    <th>Silnik</th>
                    <th>Przebieg</th>
                </tr>
                </thead>
                <tbody>
                {currentCars.map((car) => (
                    <tr key={car._id}>
                        <td>{car.brand}</td>
                        <td>{car.model}</td>
                        <td>{car.car_year}</td>
                        <td>{car.engine}</td>
                        <td>{car.mileage}</td>
                        <td>
                            <Link to={`/vGarage/myCars/${car._id}`}>
                                SZCZEGÓŁY
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default CarTable;