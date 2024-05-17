import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../Form/InputField';
import {loginUser} from "../../api/services/User";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        // Logika obsługi logowania
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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Adres e-mail"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="wprowadź adres email..."
                />
                <InputField
                    label="Hasło"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="wprowadź hasło..."
                />
                <button type="reset">Wyczyść</button>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;