import React from 'react'
import { useState } from 'react';
import { Card, CardBody } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import calculateAvgRating from "../../../../utils/calculateAvgRating"
const AllViewTours = ({ tour }) => {
    const [currentTour, setCurrentTour] = useState(null);
    const {_id, title, city, address, desc, maxGroupSize, bookedPersonCount, remainingSlots, availableDate, photo, pricePerDay, featured, reviews} = tour
    const { totalRating, avgRating } = calculateAvgRating(reviews);

    const showTourDetails = () => {
        setCurrentTour({
            _id,
            title,
            city,
            address,
            desc,
            maxGroupSize,
            bookedPersonCount,
            remainingSlots,
            availableDate,
            photo,
            pricePerDay,
            featured,
            reviews,
        });
        const tour_content = document.getElementById('tour-content');
        if (tour_content) {
            tour_content.style.display = 'flex';
        }
    };

    const closeTourContent = () => {
        const tour_content = document.getElementById('tour-content');
        if (tour_content) {
            tour_content.style.display = 'none';
        }
        setCurrentTour(null); // Reset currentTour to null
    };

    return <div className='tour__card'>
        <Card>
            <div className='tour__img'>
                <img src={photo} alt='...' />
                {/* {featured && <span>Featured</span>} */}
            </div>
            <CardBody>
                <div className='card__top d-flex align-items-center justify-content-between'>
                    <span className='tour__location d-flex align-items-center gap-1'>
                        <i class="ri-map-pin-line"></i>{city}
                    </span>
                    <span className='tour__rating d-flex align-items-center gap-1'>
                        <i class="ri-star-fill"></i>{avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? ("not rated") : (<span>({reviews.length})</span>)}
                    </span>
                </div>
                <h5 className='tour__title'><Link to={`/tour/${_id}`} >{title}</Link></h5>

                {/* <div className='card__bottom d-flex ai align-items-center justify-content-between mt-3'>
                    <h5>${pricePerDay} <span>/per person</span></h5>
                </div> */}
                <div style={{ width: "100%", display: "flex", justifyContent:"center",alignItems:"center", marginTop:"20px"}}>
                    <Button onClick={showTourDetails} variant="contained">Double Click For Tour Details</Button>
                </div>
            </CardBody>
        </Card>
        {currentTour && (
                <div id="tour-content">
                    <div className="tour-content1">
                        <div onClick={closeTourContent} id="close" className="close">
                            <h1>X</h1>
                        </div>
                        <div className="tour-content1-img">
                            <img src={photo} alt=''></img>
                        </div>
                        <div className="tour-content-inner"><h5>Title:</h5><span className="tour-span">{currentTour?.title}</span></div>
                        <div className="tour-content-inner"><h5>City:</h5><span className="tour-span">{currentTour?.city}</span></div>
                        <div className="tour-content-inner"><h5>Address:</h5><span className="tour-span">{currentTour?.address}</span></div>
                        <div className="tour-content-inner"><h5>Description:</h5><span className="tour-span">{currentTour?.desc}</span></div>
                        <div className="tour-content-inner"><h5>Max Group Size:</h5><span className="tour-span">{currentTour?.maxGroupSize}</span></div>
                        <div className="tour-content-inner"><h5>Remaining Slots:</h5><span className="tour-span">{currentTour?.remainingSlots}</span></div>
                        <div className="tour-content-inner"><h5>Booked Slots:</h5><span className="tour-span">{currentTour?.bookedPersonCount}</span></div>
                        <div className="tour-content-inner"><h5>Available Date:</h5><span className="tour-span">{currentTour?.availableDate}</span></div>
                        <div className="tour-content-inner"><h5>Featured:</h5><span className="tour-span">{currentTour?.featured ? "Yes" : "No"}</span></div>
                    </div>
                </div>
            )}
    </div>
};

export default AllViewTours