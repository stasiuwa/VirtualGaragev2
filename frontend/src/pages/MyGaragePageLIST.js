import React, {useEffect, useState} from "react";
import CarList from "../components/Car/CarList";
import {getUser, logoutUser} from "../api/services/User";
import {getAllCars} from "../api/services/Car";
import Navbar from "../components/Navbar";

const MyGaragePageLIST = () => {
    const [cars, setCars] = useState([]);
    // const [user, setUser] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await getAllCars();
                setCars(response.data);
            } catch (error) {
                setError(error.response ? error.response.data : error.message);
            }
        };
        // const fetchUser = async () => {
        //     try {
        //         const response = await getUser();
        //         setUser(response.data);
        //     } catch (error) {
        //         setError(error.response ? error.response.data : error.message);
        //     }
        // }
        fetchCars;

    }, []);
    return (
        <div>
            <div>
                <h3>
                    Moje samochody
                </h3>
                <div>
                    <Navbar/>
                </div>
                {/*
                Wyswietlic w liście zagnieżdżonej auta i posty ( tak jest w poleceniu ) z przyciskami do dodawania nowego rekordu pod
                i nad tabela. po kliknieciu w rekord przejsc w szczególy
                */}
                <div>
                    <CarList cars={cars}/>
                </div>
            </div>

        </div>
    )
}
export default MyGaragePageLIST;