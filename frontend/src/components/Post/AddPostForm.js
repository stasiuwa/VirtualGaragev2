import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import InputField from "../Form/InputField";
import {createCar} from "../../api/services/Car";
import {createPost} from "../../api/services/Post";
import Navbar from "../Navbar";

const AddPostForm = () => {
    const [formData, setFormData] = useState({
        type: '',
        date: '',
        mileage: '',
        details: '',
        price: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // logika po przesłaniu
        try {
            await createPost(formData);
            navigate("/vGarage");
            console.log(formData);
        } catch (error) {
            console.log(error.response ? error.response.data : error.message);
        } finally {
            // Resetowanie formularza po wysłaniu danych
            setFormData({
                type: '',
                date: '',
                mileage: '',
                details: '',
                price: ''
            });
        }
    };

    return (
        <div>
            <h3>
                Dodaj wpis do auta
            </h3>
            <Navbar/>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Dodaj wpis</button>
            </form>
        </div>
    );
};

export default AddPostForm;