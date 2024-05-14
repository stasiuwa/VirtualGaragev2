import { BrowserRouter, Route, Routes} from "react-router-dom";

import LoginForm from "./components/User/LoginForm";
import RegisterForm from "./components/User/LoginForm";
import GaragePage from "./pages/GaragePage";
import {AuthProvider} from "./api/auth";


export const Routing = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/vGarage" element={<GaragePage/>}/>
                    <Route path="/register" element={<RegisterForm/>}/>
                    <Route path="*" element={<div>404 i chuj</div>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}
export default Routing;