import React, {} from "react";
import Navbar from "../components/Navbar";
import PostDetails from "../components/Post/PostDetails";

const PostDetailsPage = () => {

    return (
        <div>
            <h3>SZCZEGÓŁY O WPISIE</h3>
            <div>
                <Navbar/>
            </div>
            <div>
                <PostDetails/>
            </div>
        </div>
    )
}
export default PostDetailsPage;