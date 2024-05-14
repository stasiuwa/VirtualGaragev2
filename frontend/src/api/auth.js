import React, {createContext, useContext, useState} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    let [authToken, setAuthToken] = useState();

    const setToken = (data) => {
        authToken = data;
        console.log("setToke() data: " + data + " \t token: " + data);
        console.log("token: " + authToken);
    }

    return (
        <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}


// export const setAuthToken = (token) => {
//     if (token) {
//         axios.defaults.headers.common['Authorization'] = `JWT ${token}`;
//     } else {
//         delete axios.defaults.headers.common['Authorization'];
//     }
// }