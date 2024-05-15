import React, {useState} from "react";
import {Link} from "react-router-dom";

const PostTable = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(15);

    const allPosts = props.data.cars.flatMap((car) =>
        car.posts.map((post) => ({ ...post, carID: car._id }))
    );
    const indexOfFirstPost = (currentPage - 1) * perPage;
    const indexOfLastPost = indexOfFirstPost + perPage;
    const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div>
            <div>
                <button onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}>
                    Poprzednia strona
                </button>
                <button onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={indexOfLastPost >= allPosts.length}>
                    Następna strona
                </button>
            </div>
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
                {currentPosts.map((post) => (
                    <tr key={post._id}>
                        <td>{post.type}</td>
                        <td>{post.date}</td>
                        <td>{post.mileage}</td>
                        <td>{post.details}</td>
                        <td>{post.price}</td>
                        <td>
                            <Link to={`/vGarage/myCars/${post.carID}/posts/${post._id}`}>
                                SZCZEGÓŁY
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PostTable;