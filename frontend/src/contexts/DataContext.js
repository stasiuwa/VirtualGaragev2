import React, {createContext, useContext, useEffect, useState} from 'react';
import {getAllCars} from "../api/services/Car";
import {getUser} from "../api/services/User";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [cars, setCars] = useState([]);
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData().then();
    }, []);

    /**
     * Wczytuje dane z bazy danych za pomoca funkcji z ../api/services/ i zapisuje je do zmiennych
     */
    const loadData = async() => {
        const fetchCars = async () => {
            try {
                const response = await getAllCars();
                setCars(response.data);
            } catch (error) {
                setError(error.response ? error.response.data : error.message);
            }
        };
        const fetchUser = async () => {
            try {
                const response = await getUser();
                setUser(response.data);
            } catch (error) {
                setError(error.response ? error.response.data : error.message);
            }
        }
        fetchUser().then(fetchCars);
    }

    const data = {user, cars, error, loadData};

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    return useContext(DataContext);
};
