import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import {useNavigate, useParams} from "react-router-dom";
import {useData} from "../contexts/DataContext";
import {deletePost, getPost} from "../api/services/Post";
import {getCar} from "../api/services/Car";

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
            <h3>SZCZEGÓŁY O WPISIE</h3>
            <Navbar/>
            <label htmlFor="carID">Samochód</label>
            <select
                className="form-control"
                id="carID"
                name="carID"
                disabled={true}
                value={car ? car._id : ''}
            >
                {car && (
                    <option key={car._id} value={car._id}>
                        {car.brand} {car.model} ({car.car_year})
                    </option>
                )}
            </select>
            <div>
                <h3>Szczegóły wpisu</h3>
                <p>Typ: {post.type}</p>
                <p>Data: {post.date}</p>
                <p>Przebieg auta: {post.mileage}</p>
                <p>Szczegóły: {post.details}</p>
                <p>Cena: {post.price}</p>
                <button onClick={editButton}>EDYTUJ</button>
                <button onClick={deleteButton}>USUŃ</button>
            </div>
        </div>
    )
}
export default PostDetailsPage;