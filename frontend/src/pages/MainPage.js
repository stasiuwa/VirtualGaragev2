import React, {useEffect} from "react";
import Navbar from "../components/Navbar";
import {loginUser} from "../api/services/User";

const GaragePage = () => {

    /**
     * Timer ustawiony na 1h ( tyle co czas wygaśniecia tokena ), po tym czasie wywołuje funkcje loginUser aby otrzymac token od serwera
     */
    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                await loginUser;
            } catch (error) {
                console.error("Error refreshing token!", error);
            }
        }, 3600000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <h3>Wirtualny Garaż</h3>
            <div>
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