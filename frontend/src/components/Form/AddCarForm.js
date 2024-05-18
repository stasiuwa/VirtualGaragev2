import React, {useState} from 'react';
import InputField from './InputField';
import {createCar} from "../../api/services/Car";
import Navbar from "../Navbar";
import {useData} from "../../contexts/DataContext";
import {validateCarForm} from "./validation";

const AddCarForm = () => {
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        car_year: '',
        engine: '',
        mileage: ''
    });
    const [formErrors, setFormErrors] = useState({})
    const data = useData();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // walidacja
        const validationResults = validateCarForm(formData);
        if (Object.keys(validationResults).length > 0) {
            setFormErrors(validationResults);
            return
        }

        //Logika po przesłaniu - redirect
        try {
            console.log(formData);
            console.log(data.cars);
            await createCar(formData);
            alert("Dodano auto do garażu!");
            await data.loadData();
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
            setFormData({
                brand: '',
                model: '',
                car_year: '',
                engine: '',
                mileage: ''
            });
        }
    };
    const handleReset = () => {
        setFormData({
            brand: '',
            model: '',
            car_year: '',
            engine: '',
            mileage: ''
        });
        setFormErrors({})
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Resetowanie błędu dla aktualizowanego pola
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: undefined
            });
        }
    };

    return (
        <div>
            <h3>
                DODAJ AUTO
            </h3>
            <Navbar/>
            <form
                onSubmit={handleSubmit}
                onReset={handleReset}
            >
                <InputField
                    label="Marka"
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="Wprowadź markę samochodu..."
                    error={formErrors.brand}
                />
                <InputField
                    label="Model"
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="Wprowadź model samochodu..."
                    error={formErrors.model}
                />
                <InputField
                    label="Rok produkcji"
                    type="number"
                    name="car_year"
                    value={formData.car_year}
                    onChange={handleChange}
                    placeholder="Wprowadź rok produkcji samochodu..."
                    error={formErrors.car_year}
                />
                <InputField
                    label="Silnik"
                    type="text"
                    name="engine"
                    value={formData.engine}
                    onChange={handleChange}
                    placeholder="Wprowadź informacje o silniku samochodu..."
                    error={formErrors.engine}
                />
                <InputField
                    label="Przebieg"
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    placeholder="Wprowadź przebieg samochodu..."
                    error={formErrors.mileage}
                />
                <button type="reset">Wyczyść</button>
                <button type="submit">Dodaj samochód</button>
            </form>
        </div>
    );
};

export default AddCarForm;