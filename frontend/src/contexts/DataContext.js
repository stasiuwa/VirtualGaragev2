import React, {createContext, useContext, useEffect, useState} from 'react';
import {getAllCars} from "../api/services/Car";
import {getUser} from "../api/services/User";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [cars, setCars] = useState([]);
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);

    // Podział na strony
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        loadData().then();
    }, [currentPage]);

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
    // const addPostToCar = (post) => {
    //     setCars(prevCars => {
    //         // Znajdź samochód o podanym carId
    //         return prevCars.map(car => {
    //             if (car._id === post.carID) {
    //                 // Znaleziono samochód, dodaj nowy post do jego listy postów
    //                 return {
    //                     ...car,
    //                     // Dodaj nowy post do listy postów
    //                     posts: [...car.posts, post]
    //                 };
    //             }
    //             // Jeśli to nie jest szukany samochód, zwróć bez zmian
    //             return car;
    //         });
    //     });
    // }

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
