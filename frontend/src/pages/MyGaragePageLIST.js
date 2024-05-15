import React, {useEffect, useState} from "react";
import CarList from "../components/Car/CarList";
import Navbar from "../components/Navbar";
import {useLocation} from "react-router-dom";

const MyGaragePageLIST = () => {
    const [cars, setCars] = useState([]);
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);

    // odbiór wartości przekazanych od linków w navbar
    const location = useLocation();
    useEffect(() => {
        try {
            setCars(location.state?.cars || []);
            setUser(location.state?.user || []);
        } catch (error) {
            setError(error.response ? error.response.data : error.message);
        }
    }, []);

    return (
        <div>
            <div>
                <h3>
                    Moje auta LISTA
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}
export default MyGaragePageLIST;