import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteCar} from "../../api/services/Car";
import {useData} from "../../contexts/DataContext";

const CarTable = (props) => {
    const data = useData();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(15);


    const indexOfFirstCar = (currentPage - 1) * perPage;
    const indexOfLastCar = indexOfFirstCar + perPage;
    const currentCars = props.data.cars.slice(indexOfFirstCar, indexOfLastCar);

    const deleteButton = async (carID) => {
        await deleteCar(carID);
        alert("Usunieto auto!");
        await data.loadData();
    }

    return (
        <div>
            <div style={{
                padding: '2%',
            }}>
                <button className={'btn btn-light'}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}>
                    Poprzednia strona
                </button>
                <button className={'btn btn-light'} style={{marginLeft: '1vw'}}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={indexOfLastCar >= props.data.cars.length}>
                    Następna strona
                </button>
            </div>
            <table className={'table table-dark table-responsive-xxl'}>
                <thead>
                <tr>
                    <th>Marka</th>
                    <th>Model</th>
                    <th>Rok</th>
                    <th>Silnik</th>
                    <th>Przebieg</th>
                    <th></th>
                    <th></th>
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
                            <button className={'btn btn-dark'} style={{color: 'blue'}}
                                onClick={() => navigate(`/vGarage/myCars/${car._id}`)}>SZCZEGÓŁY</button>
                        </td>
                        <td>
                            <button className={'btn btn-dark'} style={{color: 'red'}}
                                onClick={() => deleteButton(car._id)}>USUŃ</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default CarTable;