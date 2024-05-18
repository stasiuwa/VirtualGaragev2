const validateCarForm = (formData) => {
    const errors = {};
    if (!formData.brand) errors.brand = "Marka jest wymagana.";
    if (!formData.model) errors.model = "Model jest wymagany.";
    if (!formData.car_year || isNaN(formData.car_year) || formData.car_year <= 1950 || formData.car_year > new Date().getFullYear()) errors.car_year = "Rok produkcji jest wymagany, z zakresu od 1950 do bieżacego";
    if (!formData.engine) errors.engine = "Informacje o silniku są wymagane.";
    if (!formData.mileage || isNaN(formData.mileage) || formData.mileage < 0) errors.mileage = "Przebieg jest wymagany i nie może być mniejszy od zera, no bo jak.";
    return errors;
};
const validatePostForm = (formData) => {
    const errors = {};
    if (!formData.carID) errors.carID = "Musisz wybrać samochód.";
    if (!formData.type) errors.type = "Typ wpisu jest wymagany.";
    if (!formData.mileage || isNaN(formData.mileage) || formData.mileage < 0) errors.mileage = "Przebieg jest wymagany i nie może być mniejszy od zera, wiadomo.";
    if (formData.price && formData.price < 0) errors.price = "Cena nie może być mniejsza od zera.";
    return errors;
}
const validateRegister = (formData) => {
    const errors = {};
    if (!formData.username || formData.username.length < 3) errors.username = "Podaj nazwe użytkownika (co najmniej 3 znaki)!";
    if (!formData.email) {
        errors.email = "Podaj adres email!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Niepoprawny format adresu email!";
    }
    if (!formData.password || formData.password.length < 6) {
        errors.password = "Podaj hasło, musi mieć co najmniej 6 znaków!";
    }

    if (!formData.passwordCheck) {
        errors.passwordCheck = "Potwierdź hasło!";
    } else if (formData.passwordCheck !== formData.password) {
        errors.passwordCheck = "Hasła nie pasują do siebie!";
    }
    return errors;
}
const validateLogin = (formData) => {
    const errors = {};
    if (!formData.email) errors.email = "Podaj adres email!";
    if (!formData.password) errors.password = "Podaj hasło!";
    return errors;
}


export { validateCarForm, validatePostForm, validateLogin, validateRegister }