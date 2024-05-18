import React, {useState} from "react";
import InputField from "./InputField";
import {createPost} from "../../api/services/Post";
import Navbar from "../Navbar";
import {useData} from "../../contexts/DataContext";

const AddPostForm = () => {

    const [formData, setFormData] = useState({
        carID: '',
        type: '',
        date: '',
        mileage: '',
        details: '',
        price: ''
    });
    const data = useData();

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
            // data.addPostToCar(formData);
            const response = await createPost(formData.carID, formData);
            await data.loadData();
            alert("Dodano wpis do auta!");
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
                        {data.cars.map((car) => (
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