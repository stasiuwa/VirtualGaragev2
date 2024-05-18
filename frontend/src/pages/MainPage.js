import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import {getUser} from "../api/services/User";

import bgImage from "../assets/img/garaz.png";
import merolIcon from "../assets/img/merolico.png";
import {Link} from "react-router-dom";

const GaragePage = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUser();
                setUser(response.data);
            } catch (error) {
                console.log(error.response ? error.response.data : error.message);
            }
        }
        fetchUser();
    }, []);

    return (
        <div className="menu-container">
            <div className={'backgroundImage'} style={{
                backgroundImage: `url(${bgImage})`,
            }}>
                <div className="on-image menu-text" style={{ top: '0' }}>
                    <font color="#ff4c4c">Witaj</font>
                    <br/>{user.username}
                </div>
                <div className="on-image logo">
                    GARASH&nbsp;<img className="logo-img" src={merolIcon} alt={'merol_ikonka'}/>
                </div>
                <div className={'on-image navbar'}
                     style={{
                         width: '100vw',
                         marginTop: '20%',
                         background: 'linear-gradient(0deg, rgba(6,6,6,1) 0%, rgba(0,0,0,0) 100%)',
                     }}>
                    <Navbar/>
                </div>
            </div>
            <footer>
                <div className="footer menu-text">@PW</div>
            </footer>
        </div>
    )
}
export default GaragePage;