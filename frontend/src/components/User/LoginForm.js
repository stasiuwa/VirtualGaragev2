import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../Form/InputField';
import {loginUser} from "../../api/services/User";
import {validateLogin} from "../Form/validation";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Logika obsługi logowania
        // walidacja
        const validationResults = validateLogin(formData);
        if (Object.keys(validationResults).length > 0) {
            setFormErrors(validationResults);
            return
        }

        try {
            await loginUser(formData);
            //Logika po zalogowaniu - redirect
            navigate("/vGarage");
        } catch (error) {
            // odbiór odpowiedzi z walidacji od serwera i wyswietlenie jej w alercie na stronie
            console.log(error.response ? error.response.data : error.message);
            const message = (error.response ? error.response.data.message : error.message);
            // console.log(error.response.data.error.errors);
            alert(`${message}`);
        }
    };
    const handleReset = () => {
        setFormData({
            email: '',
            password: ''
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
            <form
                onSubmit={handleSubmit}
                onReset={handleReset}
            >
                <InputField
                    label="Adres e-mail"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="wprowadź adres email..."
                    error={formErrors.email}
                />
                <InputField
                    label="Hasło"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="wprowadź hasło..."
                    error={formErrors.password}
                />
                <button type="reset">Wyczyść</button>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;