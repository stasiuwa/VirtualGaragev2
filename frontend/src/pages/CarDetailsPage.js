import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import {Link, useParams} from "react-router-dom";
import {getCar} from "../api/services/Car";
import CarDetails from "../components/Car/CarDetails";

const CarDetailsPage = () => {
    const { carID } = useParams();
    const [car, setCar] = useState({
        _id: carID,
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
                console.log("fetchCar", response.data);
            } catch (error) {
                console.error("Error fetching car data:", error);
            }
        };
        fetchCar();
    }, [carID]);

    if (!car) return <h1>Ładowanie...</h1>;

    return (
        <div>
            <h3>SZCZEGÓŁY O AUCIE</h3>
            <div>
                <Navbar/>
                <CarDetails car={car}/>
            </div>
            <div>
                <div>
                    <h4>WPISY</h4>
                    <ul style={{ listStyleType: 'decimal' }}>
                        {car.posts.map((item, index) => (
                            <li key={index}>
                                <Link to={`/vGarage/myCars/${carID}/posts/${item._id}`}>
                                    {item.type} {item.date}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default CarDetailsPage;