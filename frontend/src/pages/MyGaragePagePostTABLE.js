import React, {useEffect} from "react";
import Navbar from "../components/Navbar";
import CarTable from "../components/Car/CarTable";
import PostTable from "../components/Post/PostTable";
import {useData} from "../contexts/DataContext";
import merolIcon from "../assets/img/merolico.png";

const MyGaragePagePostTABLE = () => {
    const data = useData();
    useEffect(() => {
        data.loadData();
    }, []);
    return (
        <div>
            <div>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '1vw',
                    background: '#27211e'
                }}>
                    <div style={{fontSize: '175%', color: '#cf4a4a', marginLeft: '2vw'}}>
                        TABELA WPISÓW
                    </div>
                    <div style={{fontSize: '175%', color: '#cf4a4a', marginRight: '2vw'}}>
                        GARASH&nbsp;<img className="logo-img" src={merolIcon} alt={'merol_ikonka'}/>
                    </div>
                </div>
                <Navbar/>
                <div>
                    <PostTable data={data}/>
                </div>
            </div>

        </div>
    )
}
export default MyGaragePagePostTABLE;