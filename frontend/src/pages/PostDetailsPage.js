import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import {useNavigate, useParams} from "react-router-dom";
import {useData} from "../contexts/DataContext";
import {deletePost, getPost} from "../api/services/Post";
import {getCar} from "../api/services/Car";
import merolIcon from "../assets/img/merolico.png";

const PostDetailsPage = () => {
    const { carID, postID } = useParams();
    const [post, setPost] = useState({});
    const [car, setCar] = useState({});
    const data = useData();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                //     zapytanie GET do API w celu pobrania danych o wpisie
                const responsePost = await getPost(carID, postID);
                setPost(responsePost.data);
                const responseCar = await getCar(carID);
                setCar(responseCar.data);
            } catch (error) {
                console.log(error.response ? error.response.data : error.message);
                // alert('Nie znaleziono wpisu!');
            }
        }
        fetchPostData();
    }, [carID, postID]);

    const deleteButton = async () => {
        await deletePost(carID, postID);
        alert("Usunieto wpis!");
        await data.loadData();
        navigate(`/vGarage`);
    }
    const editButton = async () => {
        navigate(`/vGarage/myCars/${carID}/posts/${postID}/editPost`);
    }

    if (!post) return <h1>Ładowanie...</h1>;

    return (
        <div>
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '1vw',
                background: '#27211e'
            }}>
                <div style={{fontSize: '175%', color: '#cf4a4a', marginLeft: '2vw'}}>
                    SZCZEGÓŁY O WPISIE
                </div>
                <div style={{fontSize: '175%', color: '#cf4a4a', marginRight: '2vw'}}>
                    GARASH&nbsp;<img className="logo-img" src={merolIcon} alt={'merol_ikonka'}/>
                </div>
            </div>
            <Navbar/>
            <div>
                <div className={'car-item-container'} style={{display: 'flex', padding: '1vw', borderBottom: 'black solid 5px'}}>
                    <div style={{color: 'whitesmoke', marginRight: '1vw'}}>SAMOCHÓD:</div>
                    <div style={{color: 'red'}}>{car.brand} {car.model} ({car.car_year})</div>
                </div>
                <div style={{
                    display: 'flex',
                    flexFlow: 'row'
                }}>
                    <div className={'car-item-container'} style={{
                        display: 'flex',
                        flexFlow: 'column'
                    }}>
                        <div className={'car-item'}>Typ: {post.type}</div>
                        <div className={'car-item'}>Data: {post.date}</div>
                        <div className={'car-item'}>Cena: {post.price}</div>
                    </div>
                    <div className={'car-item-container'} style={{
                        display: 'flex',
                        flexFlow: 'column'
                    }}>
                        <div className={'car-item'}>Przebieg auta: {post.mileage}</div>
                        <div className={'car-item'}>Szczegóły: {post.details}</div>
                    </div>
                    <div className={'car-item-container'}>
                        <div className={'car-item'} style={{
                            padding: '2vw',
                        }}>
                            <button onClick={editButton} className={'btn btn-dark'} style={{color: 'blue'}}>EDYTUJ
                            </button>
                            <button onClick={deleteButton} className={'btn btn-dark'}
                                    style={{marginLeft: '1vw', color: 'darkred'}}>USUŃ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PostDetailsPage;