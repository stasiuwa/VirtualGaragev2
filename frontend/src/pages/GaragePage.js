import React, {useEffect, useState} from "react";
import CarList from "../components/Car/CarList";
import {getUser, logoutUser} from "../api/services/User";
import {useNavigate} from "react-router-dom";
import {getAllCars} from "../api/services/Car";

const GaragePage = () => {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [user, setUser] = useState({});
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
        const fetchUser = async () => {
            try {
                const response = await getUser();
                setUser(response.data);
            } catch (error) {
                setError(error.response ? error.response.data : error.message);
            }
        }
        fetchUser().then(fetchCars);

    }, []);
    const logout = async () => {
        try {
            await logoutUser();
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <div>
            <h1>Wirtualny Garaż</h1>
            <div>
                <h3>
                    witaj {user.username}
                </h3>
                <div>
                    <button/>
                    <button/>
                    <button/>
                    <button/>
                </div>
                <div>
                    <CarList cars={cars}/>
                </div>
            </div>
            <div>
                <button onClick={logout}>
                    Wyloguj się
                </button>
            </div>
        </div>
    )
}
export default GaragePage;