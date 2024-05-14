import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import InputField from '../Form/InputField';
import {loginUser} from "../../api/services/User";
import { useAuth } from "../../api/auth";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { authToken, setAuthToken } = useAuth();
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        localStorage.setItem(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Logika obsługi logowania
        try {
            const response = await loginUser(formData);
            const data = response.data;

            // Przechowuje tokeny JWT w Context
            localStorage.setItem("token", data.token);
            await setAuthToken(data.token);

            // Ustawienie tokenu w Axios dla przyszłych żądań
            // api.defaults.headers.common['Authorization'] = `JWT ${token}`;

            //Logika po zalogowaniu - redirect
            navigate("/vGarage");

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
                    label="Hasło"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="wprowadź hasło..."
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;