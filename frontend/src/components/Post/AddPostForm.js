import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import InputField from "../Form/InputField";
import {createPost} from "../../api/services/Post";
import Navbar from "../Navbar";

const AddPostForm = () => {
    const [cars, setCars] = useState([]);
    // const [user, setUser] = useState({});
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        carID: '',
        type: '',
        date: '',
        mileage: '',
        details: '',
        price: ''
    });
    const navigate = useNavigate();

    // odbiór wartości przekazanych od linków w navbar
    const location = useLocation();
    useEffect(() => {
        try {
            setCars(location.state?.cars || []);
            // setUser(location.state?.user || []);
        } catch (error) {
            setError(error.response ? error.response.data : error.message);
        }
    }, []);


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
            console.log(formData.carID,formData);
            await createPost(formData.carID, formData);
            alert("Dodano wpis do auta");
            // navigate("/vGarage");
            console.log(formData);
        } catch (error) {
            console.log(error.response ? error.response.data : error.message);
        } finally {
            // Resetowanie formularza po wysłaniu danych
            setFormData({
                carID: '',
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="carID">Wybierz samochód</label>
                    <select
                        className="form-control"
                        id="carID"
                        name="carID"
                        value={formData.carID}
                        onChange={handleChange}
                    >
                        <option value="">-- Wybierz samochód --</option>
                        {cars.map((car) => (
                            <option key={car._id} value={car._id}>
                                {car.brand} {car.model} ({car.car_year})
                            </option>
                        ))}
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
                <button type="submit">Dodaj wpis</button>
            </form>
        </div>
    );
};

export default AddPostForm;