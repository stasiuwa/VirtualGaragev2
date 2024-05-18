import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../Form/InputField';
import {registerUser} from "../../api/services/User";
import {validateRegister} from "../Form/validation";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        passwordCheck: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Logika obsługi przesłania formularza rejestracji

        // walidacja
        const validationResults = validateRegister(formData);
        if (Object.keys(validationResults).length > 0) {
            setFormErrors(validationResults);
            return
        }

        try {
            // Sprawdz czy hasła sie zgadzają
            if (formData.password === formData.passwordCheck) {
                //Logika po zarejestrowaniu - redirect
                console.log("user: ", formData);
                const response = await registerUser(formData);
                console.log("response: ", response.data.message);
                navigate("/login");
            }
        } catch (error) {
            // odbiór odpowiedzi z walidacji od serwera i wyswietlenie jej w alercie na stronie
            console.log(error.response ? error.response.data : error.message);
            const message = (error.response ? error.response.data.message : error.message);
            // console.log(error.response.data.error.errors);
            alert(`${message}`);
            handleReset();
        }
    };
    const handleReset = () => {
        setFormData({
            email: '',
            username: '',
            password: '',
            passwordCheck: ''
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
                    label="Nazwa użytkownika"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="wprowadź nazwe użytkownika..."
                    error={formErrors.username}
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
                <InputField
                    label="Potwierdź hasło"
                    type="password"
                    name="passwordCheck"
                    value={formData.passwordCheck}
                    onChange={handleChange}
                    placeholder="powtórz hasło..."
                    error={formErrors.passwordCheck}
                />
                <button type="reset">Wyczyść</button>
                <button type="submit">Zarejestruj się!</button>
            </form>
        </div>
    );
};
export default RegisterForm;