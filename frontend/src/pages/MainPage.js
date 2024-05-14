import React, {useEffect, useState} from "react";
import {getUser, logoutUser} from "../api/services/User";
import {Navigate, redirect, useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";

const GaragePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUser();
                setUser(response.data);
            } catch (error) {
                setError(error.response ? error.response.data : error.message);
            }
        }
        fetchUser();

    }, []);
    const navigateButton = (destination) => {
        navigate(destination, user);
    }
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
                {/*
                Tutaj bedzie strona tytułowa, navbar do poskakania z ewentualnie innym stylem i jakis krótki opis na dole strony.
                */}
                <div>
                    <Navbar/>
                </div>
            </div>
        </div>
    )
}
export default GaragePage;