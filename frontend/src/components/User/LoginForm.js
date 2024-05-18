import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import InputField from '../Form/InputField';
import {loginUser} from "../../api/services/User";
import {validateLogin} from "../Form/validation";
import merolIcon from "../../assets/img/merolico.png";

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
        <div className={'modal-form-body'}>
            <div className="on-image menu-text" style={{top: '3vh', left: '4vw', fontSize: '175%'}}>
                LOGOWANIE<br/>
                <Link to={'/'} style={{ color: '#ff4c4c', fontSize: '75%'}}>Strona główna</Link>
            </div>
            <div className="on-image logo">
                GARASH&nbsp;<img className="logo-img" src={merolIcon} alt={'merol_ikonka'}/>
            </div>
            <form
                onSubmit={handleSubmit}
                onReset={handleReset}
                className={'modal-body'}
            >
                <div>
                    <div style={{marginLeft: '25%', marginRight: '25%', marginBottom: '2%', marginTop: '2%'}}>
                        <div style={{
                            width: '100%',
                        }}>
                            <div className={'form-title'} style={{fontSize: '175%'}}>
                                <div style={{marginBottom: '10px'}}>Witamy z powrotem!</div>
                                <Link to={'/register'} style={{color: 'white', fontSize: '1vw'}}>
                                    Nie masz konta? Załóż je!
                                </Link>
                            </div>
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
                        </div>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <button type="reset" className={'form-btn'}>X</button>
                            <button type="submit" className={'form-btn'}>Zaloguj się</button>
                        </div>
                    </div>
                </div>
            </form>
            <footer>
            <div className="footer menu-text">@PW</div>
            </footer>
        </div>
    );
};

export default LoginForm;