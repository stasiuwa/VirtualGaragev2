import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {logoutUser, getUser} from "../api/services/User";
import {getAllCars} from "../api/services/Car";

const Navbar = () => {
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
    /**
     * Przekierowuje na określony adres
     * @param destination
     */
    const goToPage = (destination) => {
        navigate(destination);
    }
    /**
     * Przekierowuje na określony adres wraz z obiektem user i cars[]
     * @param destination
     */
    const goToPageWithParams = (destination) => {
        navigate(destination, { state: { user: user, cars: cars }});
    }

    return (
        <div>
            {/*nie mozna bezposrednio wywołac, trzeba przekazac jako funkcje callback*/}
            <button onClick={() => goToPage('/vGarage')}>
                Strona główna
            </button>
            <button onClick={() => goToPageWithParams('/vGarage/myGarageTABLE')}>
                Auta i wpisy TABELE
            </button>
            <button onClick={() => goToPageWithParams('/vGarage/myGarageLIST')}>
                Auta i wpisy LISTA
            </button>
            <button onClick={() => goToPage('/vGarage/myCars/addCar')}>
                Dodaj auto
            </button>
            <button onClick={() => goToPageWithParams('/vGarage/myCars/:carID/posts/addPost')}>
                Dodaj wpis
            </button>
            <button onClick={logout}>
                Wyloguj się
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}
export default Navbar;