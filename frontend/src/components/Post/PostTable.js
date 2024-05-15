import React, { } from "react";
import {Link} from "react-router-dom";
import {useData} from "../../contexts/DataContext";

const PostTable = (props) => {
    // const data = useData();

    return (
        <table>
            <thead>
            <tr>
                <th>Typ</th>
                <th>Data</th>
                <th>Przebieg</th>
                <th>Szczegóły</th>
                <th>Cena</th>
            </tr>
            </thead>
            <tbody>
            {props.data.cars.map((car) =>
                car.posts.map((post) => (
                    <tr key={post._id}>
                        <td>{post.type}</td>
                        <td>{post.date}</td>
                        <td>{post.mileage}</td>
                        <td>{post.details}</td>
                        <td>{post.price}</td>
                        <td>
                            <Link to={`/vGarage/myCars/${car._id}/posts/${post._id}`}>
                                SZCZEGÓŁY
                            </Link>
                        </td>
                    </tr>
                ))
            )}
            </tbody>
        </table>
    );
}

export default PostTable;