import React, {} from "react";
import Navbar from "../components/Navbar";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useData} from "../contexts/DataContext";
import {deleteCar} from "../api/services/Car";

const CarDetailsPage = () => {
    const { carID } = useParams();
    const data = useData();
    const navigate = useNavigate();

    const car = data.cars.find((car) => car._id === carID);
    if (!car) return <h1>Ładowanie...</h1>;
    const {brand, model, car_year, engine, mileage} = car;

    const deleteButton = async () => {
        await deleteCar(carID);
        alert("Usunieto auto!");
        await data.loadData();
        navigate('/vGarage');
    }
    const editButton = async () => {
        navigate(`/vGarage/myCars/${carID}/editCar`);
    }

    return (
        <div>
            <h3>SZCZEGÓŁY O AUCIE</h3>
            <div>
                <div>
                    <Navbar/>
                </div>
                <div>
                    <h3>Szczegóły samochodu</h3>
                    <p>Marka: {car.brand}</p>
                    <p>Model: {car.model}</p>
                    <p>Rok produkcji: {car.car_year}</p>
                    <p>Silnik: {car.engine}</p>
                    <p>Przebieg: {car.mileage}</p>
                    <button onClick={editButton}>EDYTUJ</button>
                    <button onClick={deleteButton}>USUŃ</button>
                </div>
            </div>
        </div>
    )
}
export default CarDetailsPage;