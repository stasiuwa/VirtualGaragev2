import React, {useEffect} from "react";
import Navbar from "../components/Navbar";
import CarTable from "../components/Car/CarTable";
import {useData} from "../contexts/DataContext";
import merolIcon from "../assets/img/merolico.png";

const MyGaragePageCarTABLE = () => {
    const data = useData();
    useEffect(() => {
        data.loadData();
    }, []);
    return (
        <div style={{
            width: '100vw'
        }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '1vw',
                    background: '#27211e'
                }}>
                    <div style={{fontSize: '175%', color: '#cf4a4a', marginLeft: '2vw'}}>
                        TABELA AUT
                    </div>
                    <div style={{fontSize: '175%', color: '#cf4a4a', marginRight: '2vw'}}>
                        GARASH&nbsp;<img className="logo-img" src={merolIcon} alt={'merol_ikonka'}/>
                    </div>
                </div>
                <Navbar/>
                <div>
                    <CarTable data={data}/>
                </div>

        </div>
    )
}
export default MyGaragePageCarTABLE;