import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import {getUser} from "../api/services/User";

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
        <div>
            <h3>Wirtualny Garaż</h3>
            <Navbar/>
            <div>
                <h3>Witaj {user.username}</h3>
            </div>
        </div>
    )
}
export default GaragePage;