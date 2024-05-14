import React, {useEffect, useState} from "react";
import {getAllCars} from "../api/services/Car";
import Navbar from "../components/Navbar";
import CarTable from "../components/Car/CarTable";
import PostTable from "../components/Post/PostTable";

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
                Wyswietlic w dwóch tabelach auta i posty ( tak jest w poleceniu ) z przyciskami do dodawania nowego rekordu pod
                i nad tabela. po kliknieciu w rekord przejsc w szczególy
                */}
                <div>
                    <CarTable cars={cars}/>
                </div>
                <div>
                    <PostTable posts={cars.posts}/>
                </div>
            </div>

        </div>
    )
}
export default MyGaragePageLIST;