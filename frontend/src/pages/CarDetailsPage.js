import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import {useParams} from "react-router-dom";
import {getCar} from "../api/services/Car";
import CarDetails from "../components/Car/CarDetails";

const CarDetailsPage = () => {
    const { carID } = useParams();
    const [car, setCar] = useState({
        brand: '',
        model: '',
        car_year: '',
        engine: '',
        mileage: '',
        posts: []
    });
    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await getCar(carID);
                setCar(response.data);
            } catch (error) {
                console.error("Error fetching car data:", error);
            }
        };
        fetchCar();
    }, [carID]);

    if (!car) return <h1>Ładowanie...</h1>;
    const {brand, model, car_year, engine, mileage, posts} = car;

    return (
        <div>
            <h3>SZCZEGÓŁY O AUCIE</h3>
            <div>
                <Navbar/>
                <CarDetails car={car}/>
            </div>
            <div>
                <div>
                    <ul style={{ listStyleType: 'decimal' }}>
                        {posts.map((item, index) => (
                            <li key={index}>
                                Typ: {item.type}, Data: {item.date}, Przebieg: {item.mileage}, Szczegóły: {item.details}, Cena: {item.price}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default CarDetailsPage;