import React, {useEffect} from "react";
import Navbar from "../components/Navbar";
import {useData} from "../contexts/DataContext";

const GaragePage = () => {
    const data = useData();
    useEffect(() => {
        data.loadData();
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