import React, {} from "react";
import {useNavigate} from "react-router-dom";

const WelcomePage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h3>Wirtualny Garaż</h3>
            <div>
                <button onClick={() => navigate('/login')}>ZALOGUJ SIĘ</button>
                <button onClick={() => navigate('/register')}>ZAREJESTRUJ SIE</button>
            </div>
        </div>
    )
}
export default WelcomePage;