import React, {useEffect, useState} from "react";
import InputField from "./InputField";
import {getPost, updatePost} from "../../api/services/Post";
import Navbar from "../Navbar";
import {useData} from "../../contexts/DataContext";
import {useNavigate, useParams} from "react-router-dom";
import {getCar} from "../../api/services/Car";
import {validatePostForm} from "./validation";
import merolIcon from "../../assets/img/merolico.png";

const EditPostForm = () => {
    const { carID, postID} = useParams();
    const [car, setCar] = useState({});
    const [formData, setFormData] = useState({
        carID: carID,
        type: '',
        date: '',
        mileage: '',
        details: '',
        price: ''
    });
    const [formErrors, setFormErrors] = useState({})
    const data = useData();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPostData = async () => {
            try {
            //     zapytanie GET do API w celu pobrania danych o wpisie
                const responseCar = await getCar(carID);
                setCar(responseCar.data);
                const responsePost = await getPost(carID, postID);
                setFormData({
                    type: responsePost.data.type,
                    date: responsePost.data.date,
                    mileage: responsePost.data.mileage,
                    details: responsePost.data.details,
                    price: responsePost.data.price
                });

            } catch (error) {
                console.log(error.response ? error.response.data : error.message);
                alert('Nie znaleziono wpisu!');
            }
        }
        fetchPostData();
    }, [carID, postID]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // walidacja
        console.log(formData);
        console.log(carID);
        formData.carID = carID;
        const validationResults = validatePostForm(formData);
        if (Object.keys(validationResults).length > 0) {
            setFormErrors(validationResults);
            console.log(validationResults)
            return
        }

        // logika po przesłaniu
        try {
            console.log(carID);
            console.log(postID);
            console.log(formData);
            await updatePost(carID, postID, formData);
            await data.loadData();
            alert("Edytowano wpis!");
            navigate(`/vGarage/myCars/${carID}/posts/${postID}`);
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
    };

    const handleReset = () => {
        setFormData({
            carID: carID,
            type: '',
            date: '',
            mileage: '',
            details: '',
            price: ''
        });
        setFormErrors({})
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
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
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '1vw',
                background: '#27211e'
            }}>
                <div style={{fontSize: '175%', color: '#cf4a4a', marginLeft: '2vw'}}>
                    EDYTUJ DANE O WPISIE
                </div>
                <div style={{fontSize: '175%', color: '#cf4a4a', marginRight: '2vw'}}>
                    GARASH&nbsp;<img className="logo-img" src={merolIcon} alt={'merol_ikonka'}/>
                </div>
            </div>
            <Navbar/>
            <form
                onSubmit={handleSubmit}
                onReset={handleReset}
                style={{width: '50%', marginLeft: '15%'}}
            >
                <div className="form-group">
                    <label htmlFor="carID" style={{color: 'white'}}>Wybierz samochód</label>
                    <select
                        className="form-control"
                        id="carID"
                        name="carID"
                        disabled={true}
                        value={car ? car._id : ''}
                    >
                        {car && (
                            <option key={car._id} value={car._id}>
                                {car.brand} {car.model} ({car.car_year})
                            </option>
                        )}
                    </select>
                    {formErrors.carID && <div className="invalid-feedback">{formErrors.carID}</div>}
                </div>

                <InputField
                    label="Typ"
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    placeholder="Wprowadź typ wpisu..."
                    error={formErrors.type}
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
                    error={formErrors.mileage}
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
                    error={formErrors.price}
                />
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <button type="reset" className={'form-btn'}>Wyczyść</button>
                    <button type="submit" className={'form-btn'}>Edytuj wpis</button>
                </div>
            </form>
        </div>
    );
};

export default EditPostForm;