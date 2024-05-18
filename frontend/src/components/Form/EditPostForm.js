import React, {useEffect, useState} from "react";
import InputField from "./InputField";
import {createPost, getPost, updatePost} from "../../api/services/Post";
import Navbar from "../Navbar";
import {useData} from "../../contexts/DataContext";
import {useNavigate, useParams} from "react-router-dom";
import {getCar} from "../../api/services/Car";

const EditPostForm = () => {
    const { carID, postID} = useParams();
    const [car, setCar] = useState({});
    const [formData, setFormData] = useState({
        carID: carID,
        type: '',
        date: '',
        mileage: '',
        details: '',
        price: ''
    });
    const data = useData();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPostData = async () => {
            try {
            //     zapytanie GET do API w celu pobrania danych o wpisie
                const responseCar = await getCar(carID);
                setCar(responseCar.data);
                const responsePost = await getPost(carID, postID);
                setFormData({
                    type: responsePost.data.type,
                    date: responsePost.data.date,
                    mileage: responsePost.data.mileage,
                    details: responsePost.data.details,
                    price: responsePost.data.price
                });

            } catch (error) {
                console.log(error.response ? error.response.data : error.message);
                alert('Nie znaleziono wpisu!');
            }
        }
        fetchPostData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // logika po przesłaniu
        try {
            console.log(carID);
            console.log(postID);
            console.log(formData);
            await updatePost(carID, postID, formData);
            await data.loadData();
            alert("Edytowano wpis!");
            navigate(`/vGarage/myCars/${carID}/posts/${postID}`);
        } catch (error) {
            // odbiór odpowiedzi z walidacji od serwera i wyswietlenie jej w alercie na stronie
            console.log(error.response ? error.response.data : error.message);
            // console.log(error.response.data.error.errors);
            if (error.response.data.error.errors){
                const errors = error.response.data.error.errors;
                const errorMessages = Object.values(errors).map(err => err.message).join("\n");
                alert(`POPRAW W FORMUALRZU:\n${errorMessages}`);
            } else {
                const errorMessage = error.response?.data?.error?.message || "Wystąpił błąd. Spróbuj ponownie później.";
                alert(`Błąd (czy to blond): ${errorMessage}`);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div>
            <h3>
                Edytuj wpis
            </h3>
            <Navbar/>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
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
                </div>
                <InputField
                    label="Typ"
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    placeholder="Wprowadź typ wpisu..."
                />
                <InputField
                    label="Data"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    placeholder="Wprowadź datę wpisu..."
                />
                <InputField
                    label="Przebieg"
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    placeholder="Wprowadź przebieg..."
                />
                <InputField
                    label="Szczegóły"
                    type="text"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Wprowadź szczegóły..."
                />
                <InputField
                    label="Cena"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Wprowadź cenę..."
                />
                <button type="reset">Wyczyść</button>
                <button type="submit">Edytuj wpis</button>
            </form>
        </div>
    );
};

export default EditPostForm;