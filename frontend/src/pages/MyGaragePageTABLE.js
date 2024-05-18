import React, {useEffect} from "react";
import Navbar from "../components/Navbar";
import CarTable from "../components/Car/CarTable";
import PostTable from "../components/Post/PostTable";
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
                    Moje auta TABELA
                </h3>
                <div>
                    <Navbar/>
                </div>
                {/*
                Wyswietlic w dwóch tabelach auta i posty ( tak jest w poleceniu ) z przyciskami do dodawania nowego rekordu pod
                i nad tabela. po kliknieciu w rekord przejsc w szczególy
                */}
                <div className="d-flex">
                    <div className="flex-grow-1 m-2">
                        <CarTable data={data}/>
                    </div>
                    <div className="flex-grow-1 m-2">
                        <PostTable data={data}/>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default MyGaragePageLIST;