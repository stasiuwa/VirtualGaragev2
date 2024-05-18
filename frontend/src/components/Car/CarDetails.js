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
            <div style={{
                display: 'flex',
                flexFlow: 'row'
            }}>
                <div className={'car-item-container'} style={{
                    display: 'flex',
                    flexFlow: 'column'
                }}>
                    <div className={'car-item'}>Marka: {props.car.brand}</div>
                    <div className={'car-item'}>Model: {props.car.model}</div>
                    <div className={'car-item'}>Rok produkcji: {props.car.car_year}</div>
                </div>
                <div className={'car-item-container'} style={{
                    display: 'flex',
                    flexFlow: 'column'
                }}>
                    <div className={'car-item'}>Silnik: {props.car.engine}</div>
                    <div className={'car-item'}>Przebieg: {props.car.mileage}</div>
                </div>
                <div className={'car-item-container'}>
                    <div className={'car-item'} style={{
                        padding: '2vw',
                    }}>
                        <button onClick={editButton} className={'btn btn-dark'} style={{color: 'blue'}}>EDYTUJ</button>
                        <button onClick={deleteButton} className={'btn btn-dark'} style={{marginLeft: '1vw', color: 'darkred'}}>USUŃ</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default CarDetails;