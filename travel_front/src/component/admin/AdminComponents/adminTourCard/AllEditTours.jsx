import React, { useState } from 'react';
import { Card, CardBody } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import calculateAvgRating from "../../../../utils/calculateAvgRating";
import Button from '@mui/material/Button';
import "./editTour.css";
import EditForm from '../../scenes/editForm';
import { BASE_URL } from '../../../../utils/config';


export const AllEditTours = ({ tour }) => {
    const [deleteConfirmDiv, setDeleteConfirmDiv] = useState(false);
    const [currentUpdateTour, setCurrentUpdateTour] = useState(null);
    const { _id, title, city, address, desc, maxGroupSize, bookedPersonCount, remainingSlots, availableDate, photo, pricePerDay, featured, reviews } = tour;
    const { totalRating, avgRating } = calculateAvgRating(reviews);

    //    TOUR EDIT SECTION
    const showEdit = () => {
        setCurrentUpdateTour({
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
        const edit_tour_content = document.getElementById('edit_form');
        if (edit_tour_content) {
            edit_tour_content.style.display = 'flex';
        }
    }
    const closeUpdateTourForm = () => {
        const close_Updatetour_content = document.getElementById('edit_form');
        if (close_Updatetour_content) {
            close_Updatetour_content.style.display = 'none';
        }
        setCurrentUpdateTour(null); // Reset currentTour to null
    };
    //    TOUR EDIT SECTION


    // DELETE TOUR SECTION

    const openDeleteTour = () => {
        setDeleteConfirmDiv(true)
    }

    const deleteTour = async () => {
        console.log("DELETE TOUR");

        const response = await fetch(`${BASE_URL}/tour/${tour._id}`,
            {
                method: 'DELETE',
            }
        )

        if (!response.ok) {
            alert('Tour Deletion Failed...');
        } else {
            window.location.reload()
        }
    }

    const closeDeleteTour = () => {
        setDeleteConfirmDiv(false)
    }
    // DELETE TOUR SECTION END



    return (
        <div className="tour__card">
            <Card>
                <div className="tour__img">
                    <img src={photo} alt="..." />
                </div>
                <CardBody style={{ height: "200px" }}>
                    <div className="card__top d-flex align-items-center justify-content-between">
                        <span className="tour__location d-flex align-items-center gap-1">
                            <i className="ri-map-pin-line"></i>{city}
                        </span>
                        <span className="tour__rating d-flex align-items-center gap-1">
                            <i className="ri-star-fill"></i>{avgRating === 0 ? null : avgRating}
                            {totalRating === 0 ? "not rated" : (<span>({reviews.length})</span>)}
                        </span>
                    </div>
                    <h5 className="tour__title">
                        <Link to={`/tour/${_id}`}>{title}</Link>
                    </h5>
                    <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
                        <h5>${pricePerDay} <span>/per person</span></h5>
                    </div>
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                        <Button onClick={showEdit} variant="contained">Double Click To Edit</Button>
                        <Button onClick={openDeleteTour} variant='contained'>Delete Tour</Button>
                    </div>
                </CardBody>
            </Card>
            {currentUpdateTour && (
                <div id='edit_form'>
                    <div className='edit_form_inner'>
                        <div onClick={closeUpdateTourForm} id="close" className="edit_Close">
                            <h1>X</h1>
                        </div>
                        <EditForm tour={tour} />
                    </div>
                </div>
            )}
            {deleteConfirmDiv &&
                <div id='deleteConfirm'>
                    <span>Are you Sure you want to delete {title} Tour ?</span>
                    <div id='deleteConfirm_btn'>
                        <Button variant='contained' onClick={closeDeleteTour}>cancel</Button>
                        <Button variant='contained' onClick={deleteTour}>ok</Button>
                    </div>
                </div>
            }
        </div>
    );
};
