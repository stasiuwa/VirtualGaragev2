import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../Form/InputField';
import {createCar} from "../../api/services/Car";
import Navbar from "../Navbar";

const AddCarForm = () => {
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        car_year: '',
        engine: '',
        mileage: ''
    });

    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Logika po przesłaniu - redirect
        try {
            await createCar(formData);
            navigate("/vGarage");
        } catch (error) {
            console.log(error.response ? error.response.data : error.message);
        } finally {
            setFormData({
                brand: '',
                model: '',
                car_year: '',
                engine: '',
                mileage: ''
            });
        }
    };

    return (
        <div>
            <Navbar/>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Marka"
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="Wprowadź markę samochodu..."
                />
                <InputField
                    label="Model"
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="Wprowadź model samochodu..."
                />
                <InputField
                    label="Rok produkcji"
                    type="number"
                    name="car_year"
                    value={formData.car_year}
                    onChange={handleChange}
                    placeholder="Wprowadź rok produkcji samochodu..."
                />
                <InputField
                    label="Silnik"
                    type="text"
                    name="engine"
                    value={formData.engine}
                    onChange={handleChange}
                    placeholder="Wprowadź informacje o silniku samochodu..."
                />
                <InputField
                    label="Przebieg"
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    placeholder="Wprowadź przebieg samochodu..."
                />
                <button type="reset">Wyczyść</button>
                <button type="submit">Dodaj samochód</button>
            </form>
        </div>
    );
};

export default AddCarForm;