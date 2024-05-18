import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import {Link, useParams} from "react-router-dom";
import {getCar} from "../api/services/Car";
import CarDetails from "../components/Car/CarDetails";
import merolIcon from "../assets/img/merolico.png";

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
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '1vw',
                background: '#27211e'
            }}>
                <div style={{fontSize: '175%', color: '#cf4a4a', marginLeft: '2vw'}}>
                    SZCZEGÓŁY O AUCIE
                </div>
                <div style={{fontSize: '175%', color: '#cf4a4a', marginRight: '2vw'}}>
                    GARASH&nbsp;<img className="logo-img" src={merolIcon} alt={'merol_ikonka'}/>
                </div>
            </div>
            <Navbar/>

            <CarDetails car={car}/>
            <div>
                <div style={{
                    color: 'white',
                    padding: '2%',
                }}>
                    <h4>WPISY</h4>
                    <ul style={{listStyleType: 'decimal'}}>
                        {car.posts.map((item, index) => (
                            <li key={index}>
                                <Link to={`/vGarage/myCars/${carID}/posts/${item._id}`} style={{ color:'white'}}>
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