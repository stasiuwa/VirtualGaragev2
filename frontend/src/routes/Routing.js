import { BrowserRouter, Route, Routes} from "react-router-dom";

import LoginForm from "../components/User/LoginForm";
import RegisterForm from "../components/User/RegisterForm";
import CarDetails from "../components/Car/CarDetails";
import AddCarForm from "../components/Car/AddCarForm";
import PostDetails from "../components/Post/PostDetails";
import AddPostForm from "../components/Post/AddPostForm";
import MyGaragePageLIST from "../pages/MyGaragePageLIST";
import MyGaragePageTABLE from "../pages/MyGaragePageTABLE";
import MainPage from "../pages/MainPage";

export const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/register" element={<RegisterForm/>}/>
                <Route path="/vGarage" element={<MainPage/>}/>

                <Route path="/vGarage/myGarageLIST" element={<MyGaragePageLIST/>}/>
                <Route path="/vGarage/myGarageTABLE" element={<MyGaragePageTABLE/>}/>

                <Route path="/vGarage/myCars/:carID" element={<CarDetails/>}/>
                <Route path="/vGarage/myCars/addCar" element={<AddCarForm/>}/>

                <Route path="/vGarage/myCars/:carID/posts/:postID" element={<PostDetails/>}/>
                <Route path="/vGarage/myCars/:carID/posts/addPost" element={<AddPostForm/>}/>

                <Route path="*" element={<div>404 i chuj</div>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default Routing;