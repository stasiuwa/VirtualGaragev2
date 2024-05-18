import React, {useState} from "react";
import {Link} from "react-router-dom";

const CarList = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const indexOfFirstCar = (currentPage - 1) * perPage;
    const indexOfLastCar = indexOfFirstCar + perPage;
    const currentCars = props.data.cars.slice(indexOfFirstCar, indexOfLastCar);

    return (
        <div>
            <div style={{
                padding: '2%',
            }}>
                <button className={'btn btn-light'}
                    onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}>
                    Poprzednia strona
                </button>
                <button className={'btn btn-light'} style={{ marginLeft: '1vw'}}
                    onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={indexOfLastCar >= props.data.cars.length}>
                    Następna strona
                </button>
            </div>
            <ol  style={{color: 'white', background: '#262626'}}>
                {currentCars.map((car) => (
                    <li key={car._id}  style={{borderTop: 'gray solid 1px', paddingTop: '2vh', paddingBottom: '1vh'}}>
                        <Link to={`/vGarage/myCars/${car._id}`} style={{ color: 'wheat', marginLeft: '1vw'}}>
                            {car.brand} {car.model} {car.car_year} {car.engine} {car.mileage}
                        </Link>
                        <ul style={{ listStyleType: 'decimal' }} >
                            {car.posts.map((item, index) => (
                                <li key={index} >
                                    <Link to={`/vGarage/myCars/${car._id}/posts/${item._id}`}  style={{ color: 'white'}}>
                                        {item.type} {item.date} {item.mileage} {item.details} {item.price}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default CarList;