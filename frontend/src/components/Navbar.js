import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {logoutUser} from "../api/services/User";
import {useData} from "../contexts/DataContext";

const Navbar = () => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const data = useData();
    if (!data) {
        return <div>Loading...</div>;
    }


    const logout = async () => {
        try {
            await logoutUser();
            navigate('/');
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



    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div style={{
            display: 'flex',
            width: '100%',
        }}>
            {/*nie mozna bezposrednio wywołac, trzeba przekazac jako funkcje callback*/}
            <button onClick={() => goToPage('/vGarage')} className={'modal-btn'}>
                Strona główna
            </button>
            <button onClick={() => goToPage('/vGarage/myGarageCarTABLE')} className={'modal-btn'}>
                Auta TABELA
            </button>
            <button onClick={() => goToPage('/vGarage/myGaragePostTABLE')} className={'modal-btn'}>
                Wpisy TABELA
            </button>
            <button onClick={() => goToPage('/vGarage/myGarageLIST')} className={'modal-btn'}>
                Auta i wpisy LISTA
            </button>
            <button onClick={() => goToPage('/vGarage/myCars/addCar')} className={'modal-btn'}>
                Dodaj auto
            </button>
            <button onClick={() => goToPage('/vGarage/myCars/:carID/posts/addPost')} className={'modal-btn'}>
                Dodaj wpis
            </button>
            <button onClick={logout} className={'modal-btn'}>
                Wyloguj się
            </button>
        </div>
    )
}
export default Navbar;