import React, { } from "react";
import {Link} from "react-router-dom";
import {useData} from "../../contexts/DataContext";

const CarTable = (props) => {
    // const data = useData();

    return (
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
            {props.data.cars.map((car) => (
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
    );
}

export default CarTable;