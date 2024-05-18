import { BrowserRouter, Route, Routes} from "react-router-dom";

import LoginForm from "../components/User/LoginForm";
import RegisterForm from "../components/User/RegisterForm";
import AddCarForm from "../components/Form/AddCarForm";
import AddPostForm from "../components/Form/AddPostForm";
import MyGaragePageLIST from "../pages/MyGaragePageLIST";
import MyGaragePageTABLE from "../pages/MyGaragePageTABLE";
import MainPage from "../pages/MainPage";
import CarDetailsPage from "../pages/CarDetailsPage";
import PostDetailsPage from "../pages/PostDetailsPage";
import EditCarForm from "../components/Form/EditCarForm";
import EditPostForm from "../components/Form/EditPostForm";

export const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/register" element={<RegisterForm/>}/>
                <Route path="/vGarage" element={<MainPage/>}/>

                <Route path="/vGarage/myGarageLIST" element={<MyGaragePageLIST/>}/>
                <Route path="/vGarage/myGarageTABLE" element={<MyGaragePageTABLE/>}/>

                <Route path="/vGarage/myCars/addCar" element={<AddCarForm/>}/>
                <Route path="/vGarage/myCars/:carID" element={<CarDetailsPage/>}/>
                <Route path="/vGarage/myCars/:carID/editCar" element={<EditCarForm/>}/>

                <Route path="/vGarage/myCars/:carID/posts/addPost" element={<AddPostForm/>}/>
                <Route path="/vGarage/myCars/:carID/posts/:postID" element={<PostDetailsPage/>}/>
                <Route path="/vGarage/myCars/:carID/posts/:postID/editPost" element={<EditPostForm/>}/>

                <Route path="*" element={<div>404 i chuj</div>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default Routing;