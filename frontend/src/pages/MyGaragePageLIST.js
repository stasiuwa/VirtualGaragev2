import React, {useEffect} from "react";
import CarList from "../components/Car/CarList";
import Navbar from "../components/Navbar";
import {useData} from "../contexts/DataContext";

const MyGaragePageLIST = () => {
    const data = useData();
    useEffect(() => {
        data.loadData();
    }, []);
    return (
        <div>
            <div>
                <h3>
                    Moje auta LISTA
                </h3>
                <div>
                    <Navbar/>
                </div>
                {/*
                Wyswietlic w liście zagnieżdżonej auta i posty ( tak jest w poleceniu ) z przyciskami do dodawania nowego rekordu pod
                i nad tabela. po kliknieciu w rekord przejsc w szczególy
                */}
                <div>
                    <CarList data={data}/>
                </div>
            </div>
        </div>
    )
}
export default MyGaragePageLIST;