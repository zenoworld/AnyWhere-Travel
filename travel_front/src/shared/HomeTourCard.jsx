import React from 'react'
import { Card, CardBody } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import calculateAvgRating from '../utils/calculateAvgRating';
import './tour-card.css';

const HomeToureCard = ({ tour }) => {

    const { _id, title, city, photo, pricePerDay, featured, reviews } = tour
    const { totalRating, avgRating } = calculateAvgRating(reviews)

    const navigate = useNavigate()
    const navigateTour = () => {
        navigate('/tour')
    }

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
                <h5 className='tour__title'><Link to={`/tour/${_id}`}>{title}</Link></h5>
                <div className='card__bottom_inner_div'>
                    <span className='tour__location d-flex align-items-center gap-1'>
                        <i className="ri-map-pin-line"></i>{city}
                    </span>
                    <button className='btn_hover_tour' onClick={navigateTour}>
                        <img src='/right.png' alt='right' />
                    </button>
                </div>
            </div>
        </CardBody>
    </Card>


}

export default HomeToureCard