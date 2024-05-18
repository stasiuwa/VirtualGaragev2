import React, {} from "react";
import {Link, useNavigate} from "react-router-dom";
import bgImage from "../assets/img/mainmenuimg.png"
import merolIcon from "../assets/img/merolico.png"

const WelcomePage = () => {
    const navigate = useNavigate();
    return (
        <div className={'backgroundImage'} style={{
            backgroundImage: `url(${bgImage})`,
        }}>
            <div className="on-image menu-text">
                ZARZĄDZAJ<br/>
                <font color="#ff4c4c">SWOIMI AUTAMI</font>
            </div>
            <div className="on-image logo">
                GARASH&nbsp;<img className="logo-img" src={merolIcon} alt={'merol_ikonka'}/>
            </div>
            <div
                className={'on-image menu-btn'}
            >
                <button
                    onClick={() => navigate('/login')}
                    className="btn btn-dark login-button"
                    style={{ height: '7vh'}}
                >
                    <a className="login-button">
                        ZALOGUJ SIĘ &#x2192;
                    </a>
                </button>
                <br/>
                <Link to={'/register'} style={{color: 'white', fontSize: '1vw'}}>
                    Nie masz konta? Zarejestruj się!
                </Link>
            </div>
        </div>
    )
}
export default WelcomePage;