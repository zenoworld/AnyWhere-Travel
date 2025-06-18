import React from 'react'
import { useContext } from 'react'
import { Card, CardBody } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import calculateAvgRating from '../utils/calculateAvgRating';
import { AuthContext } from '../context/AuthContext';

import './tour-card.css';
const ToureCard = ({ tour }) => {

    const { user } = useContext(AuthContext)

    const { _id, title, city, photo,
        pricePerDay, featured, reviews } = tour
    const { totalRating, avgRating } = calculateAvgRating(reviews)



    return <Card className="tour-card-with-bg">
        <div
            className="bg-image"
            style={{ backgroundImage: `url(${photo})` }}
        />
        <div className="bg-shadow-overlay" />
        <div className='card__top'>
            <span className='tour__rating d-flex align-items-center gap-1'>
                ⭐{avgRating === 0 ? null : avgRating}
                {totalRating === 0 ? ("0 reviews") : (<span>({reviews.length})</span>)}
            </span>
            {featured && <span className='featured'>Featured</span>}
        </div>

        <CardBody>
            <div className='card__bottom'>
                <h5 className='tour__title'><Link to={`/tour/${_id}`} >{title}</Link></h5>

                <span className='tour__location d-flex align-items-center gap-1'>
                    <i className="ri-map-pin-line"></i>{city}
                </span>
                <h5>${pricePerDay} <span>/ per person</span></h5>
                {
                    user ?
                        <Link to={`/tour/${_id}`}>
                            <button className='btn booking__btn'>
                                Book now
                            </button>
                        </Link>
                        : <Link to='/login'>
                            <button className='btn booking__btn'>
                                Login to book
                            </button>
                        </Link>
                }


            </div>
        </CardBody>
    </Card>
}

export default ToureCard;