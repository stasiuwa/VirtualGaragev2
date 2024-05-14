import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../Form/InputField';
import {registerUser} from "../../api/services/User";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        passwordCheck: ''
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
        // Logika obsługi przesłania formularza rejestracji
        try {
            // Sprawdz czy hasła sie zgadzają
            if (formData.password === formData.passwordCheck) {
                //Logika po zarejestrowaniu - redirect
                await registerUser(formData);
                navigate("/login");
            }
        } catch (error) {
            console.log(error.response ? error.response.data : error.message);
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
                    label="Nazwa użytkownika"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="wprowadź nazwe użytkownika..."
                />
                <InputField
                    label="Hasło"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="wprowadź hasło..."
                />
                <InputField
                    label="Potwierdź hasło"
                    type="password"
                    name="passwordCheck"
                    value={formData.passwordCheck}
                    onChange={handleChange}
                    placeholder="powtórz hasło..."
                />
                <button type="reset">Wyczyść</button>
                <button type="submit">Zarejestruj się!</button>
            </form>
        </div>
    );
};
export default RegisterForm;