import React from "react";
import {useNavigate} from "react-router-dom";
import {logoutUser} from "../api/services/User";
import {useData} from "../contexts/DataContext";

const Navbar = () => {
    const navigate = useNavigate();

    const data = useData();
    if (!data) {
        return <div>Loading...</div>;
    }


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

    return (
        <div>
            {/*nie mozna bezposrednio wywołac, trzeba przekazac jako funkcje callback*/}
            <button onClick={() => goToPage('/vGarage')}>
                Strona główna
            </button>
            <button onClick={() => goToPage('/vGarage/myGarageTABLE')}>
                Auta i wpisy TABELE
            </button>
            <button onClick={() => goToPage('/vGarage/myGarageLIST')}>
                Auta i wpisy LISTA
            </button>
            <button onClick={() => goToPage('/vGarage/myCars/addCar')}>
                Dodaj auto
            </button>
            <button onClick={() => goToPage('/vGarage/myCars/:carID/posts/addPost')}>
                Dodaj wpis
            </button>
            <button onClick={logout}>
                Wyloguj się
            </button>
        </div>
    )
}
export default Navbar;