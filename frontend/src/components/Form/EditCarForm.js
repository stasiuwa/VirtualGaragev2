import React, {useEffect, useState} from 'react';
import * as Yup from "yup";
import {getCar, updateCar} from "../../api/services/Car";
import {useNavigate, useParams} from "react-router-dom";
import Navbar from "../Navbar";
import InputField from "./InputField";
import {useData} from "../../contexts/DataContext";

const EditCarForm = () => {
    const { carID } = useParams(); // Pobierz parametr ID z adresu URL
    const [formData, setFormData] = useState({
        carID: carID,
        brand: '',
        model: '',
        car_year: '',
        engine: '',
        mileage: ''
    });
    const data = useData();
    const navigate = useNavigate();

    // Schemat walidacji formularza
    const validationSchema = Yup.object().shape({
        brand: Yup.string().required('Brand is required'),
        model: Yup.string().required('Model is required'),
        car_year: Yup.number().required('Year is required'),
        engine: Yup.string().required('Engine is required'),
        mileage: Yup.number().required('Mileage is required'),
    });

    // Pobierz dane o aucie na podstawie jego ID z serwera
    useEffect(() => {
        const fetchCarData = async () => {
            try {
                // Wyslij zapytanie GET do API w celu pobrania danych o aucie na podstawie ID
                const car = await getCar(carID);
                // Ustaw dane o aucie w stanie komponentu
                setFormData({
                    carID: car.data.carID,
                    brand: car.data.brand,
                    model: car.data.model,
                    car_year: car.data.car_year,
                    engine: car.data.engine,
                    mileage: car.data.mileage,
                })
            } catch (error) {
                console.log(error.response ? error.response.data : error.message);
                alert('Nie znaleziono Auta!');
            }
        };
        fetchCarData();
    }, [carID]);

    // Funkcja obsługująca submit formularza
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            brand: e.target.brand.value,
            model: e.target.model.value,
            car_year: e.target.car_year.value,
            engine: e.target.engine.value,
            mileage: e.target.mileage.value,
        };
        const errors = validationSchema.validate(formData);
        if (errors.length > 0) {
            // There are errors in the form data
            alert(errors.join("\n"));
        } else {
            try {
                await updateCar(carID, formData);
                console.log(formData);
                console.log(data.cars);
                alert("Edytowano dane o aucie!");
                await data.loadData();
                console.log(data.cars);
                navigate('/vGarage');

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
        }


    };
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            <h3>
                EDYTUJ AUTO
            </h3>
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
                <button type="submit">Edytuj samochód</button>
            </form>
        </div>
    );
};

export default EditCarForm;