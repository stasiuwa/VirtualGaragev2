import React, {useEffect, useState} from "react";
import {getAllCars} from "../api/services/Car";
import Navbar from "../components/Navbar";
import CarTable from "../components/Car/CarTable";
import PostTable from "../components/Post/PostTable";
import {useLocation} from "react-router-dom";

const MyGaragePageLIST = () => {
    const [cars, setCars] = useState([]);
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);

    // odbiór wartości przekazanych od linków w navbar
    const location = useLocation();
    useEffect(() => {
        setCars(location.state?.cars || []);
        setUser(location.state?.user || []);
    }, []);

    return (
        <div>
            <div>
                <h3>
                    Moje auta TABELA
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