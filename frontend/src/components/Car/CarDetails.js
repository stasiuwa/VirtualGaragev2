import React, {} from "react";
import {useNavigate} from "react-router-dom";
import {useData} from "../../contexts/DataContext";
import {deleteCar} from "../../api/services/Car";

const CarDetails = (props) => {
    const data = useData();
    const navigate = useNavigate();

    console.log("CarDetails props: ", props.car);


    const deleteButton = async () => {
        console.log("deleteButton:",props.car._id);
        await deleteCar(props.car._id);
        alert("Usunieto auto!");
        await data.loadData();
        navigate('/vGarage');
    }
    const editButton = () => {
        console.log("ediButton:" , props.car._id);
        navigate(`/vGarage/myCars/${props.car._id}/editCar`);
    }

    return (
        <div>
            <h3>Szczegóły samochodu</h3>
            <p>Marka: {props.car.brand}</p>
            <p>Model: {props.car.model}</p>
            <p>Rok produkcji: {props.car.car_year}</p>
            <p>Silnik: {props.car.engine}</p>
            <p>Przebieg: {props.car.mileage}</p>
            <button onClick={editButton}>EDYTUJ</button>
            <button onClick={deleteButton}>USUŃ</button>

        </div>
    )
}
export default CarDetails;