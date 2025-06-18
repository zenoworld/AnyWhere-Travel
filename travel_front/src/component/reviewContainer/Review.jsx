import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import './review.css'



const Review = ({ tour, id }) => {
    const navigate = useNavigate();

    const navigateToBooking = () => {
        setInterval(() => {
            navigate(`/tour/${id}/booking`)
        }, 500)
    }

    return (
        <div className='reviewSection'>
            <div className='image_div'>
                <img src={tour.photo} alt='tourPic' />
            </div>

            <div className='review_div'>
                <div>
                    <h5>Description</h5>
                    <p>
                        {tour.desc}
                    </p>
                </div>

                <Button onClick={navigateToBooking}>
                    Book You Destination
                </Button>
            </div>
        </div>
    )
}

export default Review