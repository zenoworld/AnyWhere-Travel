import React from 'react'
import {useContext} from 'react'
import { Card, CardBody } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import calculateAvgRating from '../utils/calculateAvgRating';
import { AuthContext } from '../context/AuthContext';

import './tour-card.css';
const ToureCard = ({ tour }) => {

    const {user} = useContext(AuthContext)

    const { _id, title, city, photo, 
        pricePerDay, featured,reviews} = tour
    const { totalRating, avgRating } = calculateAvgRating(reviews)



    return <div className='tour__card'>
        <Card>
            <div className='tour__img'>
                <img src={photo} alt='...' />
                {featured && <span>Featured</span>}
            </div>
            <CardBody>
                <div className='card__top d-flex align-items-center justify-content-between'>
                    <span className='tour__location d-flex align-items-center gap-1'>
                        <i className="ri-map-pin-line"></i>{city}
                    </span>
                    <span className='tour__rating d-flex align-items-center gap-1'>
                        <i className="ri-star-fill"></i>{avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ?
                            ("not rated")
                            : (<span>({reviews.length})</span>)}

                    </span>

                </div>
                <h5 className='tour__title'><Link to={`/tour/${_id}`} >{title}</Link></h5>
                <div className='card__bottom d-flex ai align-items-center justify-content-between mt-3'>

                    <h5>${pricePerDay} <span>/per person</span></h5>
                    <button className='btn booking__btn'>
                    {
                        user ? <Link to={`/tour/${_id}`}>Book now</Link> : <Link to='/login'>Login to book</Link>
                    }    
                    </button>

                </div>
            </CardBody>
        </Card>
    </div>

}

export default ToureCard;