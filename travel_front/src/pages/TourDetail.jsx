import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import avatar from '../data/image/avatar.jpg'
import calculateAvgRating from '../utils/calculateAvgRating';
import Booking from "../component/Booking/Booking";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "./../context/AuthContext";
import { Container, Row, Col, Form, ListGroup } from "react-bootstrap";
import { motion } from 'framer-motion'

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

import '../style/tourdetail.css'


const TourDetail = () => {

  const { id } = useParams();
  const reviewMSgRef = useRef('');
  const [tourRating, setTourRating] = useState(0);
  const [reviewOpen, setReviewOpen] = useState(false);

  const { user } = useContext(AuthContext)

  //fetch data
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tour/${id}`)
  const { photo, title, desc, pricePerDay, address, reviews, city, maxGroupSize, remainingSlots, bookedPersonCount } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews)

  // format date
  const options = { day: 'numeric', month: 'long', year: 'numeric' }

  const submitHandler = async e => {
    e.preventDefault();
    const reviewText = reviewMSgRef.current.value;

    console.log(reviewText);


    try {
      if (!user || user === undefined || user === null) {
        alert("please sign in");
      }
      const reviewObj = {
        tourId: id,
        username: user?.username,
        reviewText: reviewText,
        rating: tourRating,
      }
      console.log(reviewObj);

      const res = await fetch(`${BASE_URL}/review/`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(reviewObj)
      })

      const result = await res.json()

      console.log(result);

      if (!res.ok) {
        return alert(result.message)
      }
      alert(result.message)


    } catch (err) {
      alert(err.message)
    }
    finally {
      reviewMSgRef.current.value = '';
    }

  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour])


  return <>
    <section>
      <Container>
        {loading && <h4 className="text-center pt-5">Loading . . . . </h4>}
        {error && <h4 className="text-center pt-5">{error}</h4>}
        {
          !loading && !error && <Row>
            <Col lg='8' className='tour__detail_left'>
              <div className='tour__content'>

                <motion.div
                  initial={{ opacity: 0, x: -300 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
                  className='tour__info'>
                  <h2>{title}</h2>

                  <div className='d-flex justify-content-between align-items-center gap-5'>

                    <span className='tour__rating d-flex align-items-center gap-1'>
                      <i class="ri-star-fill" style={{ 'color': "gold" }}></i>
                      {/* {avgRating === 0 ? null : avgRating} */}
                      {totalRating === 0 ?
                        ("not rated")
                        : (
                          <span>
                            ({reviews?.length} reviews)
                          </span>
                        )}
                    </span>

                    <span>
                      <i class="ri-map-pin-2-fill" style={{ color: "rgb(23, 178, 3)" }}></i>{address}
                    </span>

                    <span>
                      <i class="ri-map-pin-fill" style={{ color: "rgb(23, 178, 3)" }}></i>  {city}
                    </span>
                  </div>

                  <div className='d-flex justify-content-between align-items-center tour__extra-details'>

                    <span>
                      <i class="ri-money-dollar-circle-line" style={{ 'color': "rgb(54, 114, 114)" }}></i>${pricePerDay} / person
                    </span>

                    <span>
                      <i class="ri-group-line" style={{ 'color': "rgb(84, 209, 209)" }}></i>
                      {maxGroupSize} people
                    </span>

                    <span>
                      <i class="ri-group-line" style={{ 'color': "rgb(84, 209, 209)" }}></i>
                      {remainingSlots} Remaining Slots
                    </span>

                    <span>
                      <i class="ri-group-line" style={{ 'color': "rgb(84, 209, 209)" }}></i>
                      {bookedPersonCount} Booked Slots
                    </span>

                  </div>

                  <h5>Description</h5>
                  <p>{desc}</p>
                </motion.div>


                <motion.div
                  initial={{ opacity: 0, x: -550 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 1, ease: 'easeInOut' } }}
                  className='tour__reviews mt-3'>

                  <div className="mb-4 d-flex justify-content-between">
                    <h4>Share your Experience ({reviews?.length} reviews)</h4>
                    <button onClick={() => setReviewOpen(!reviewOpen)}>View all Reviews</button>
                  </div>

                  <Form onSubmit={submitHandler}>

                    <div className='d-flex align-items-center gap-3 mb-4 rating__group'>
                      <span onClick={() => setTourRating(1)}>
                        1 <i className="ri-star-s-fill "></i>
                      </span>
                      <span onClick={() => setTourRating(2)}>
                        2 <i className="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(3)}>
                        3 <i className="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(4)}>
                        4 <i className="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(5)}>
                        5 <i className="ri-star-s-fill"></i>
                      </span>
                    </div>

                    <div className='review__input'>
                      <input type='text' ref={reviewMSgRef} placeholder='share your thougths' required />
                      <Stack direction="row" spacing={2}>
                        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                          Send
                        </Button>
                      </Stack>
                    </div>

                  </Form>


                  {
                    reviewOpen && (
                      <div className="review_section">

                        <div className="review_section_inner">
                          <div onClick={() => setReviewOpen(!reviewOpen)} className="close_review">
                            <span>X</span>
                          </div>
                          <ListGroup className='user__reviews'>
                            {
                              reviews?.map(review => (
                                <div className="review__item">
                                  <img src={avatar} alt="avatar" />
                                  <div className='w-100'>
                                    <div className='d-flex align-items-center justify-content-between'>
                                      <div>
                                        <h5>{review.username}</h5>
                                        <p>{new Date(review.createdAt).toLocaleDateString("en-US", options)}</p>
                                      </div>
                                      <span className='d-flex align-items-center'>
                                        {review.rating}<i className="ri-star-s-fill" style={{ 'color': "gold" }}></i>
                                      </span>
                                    </div>
                                    <h6>{review.reviewText}</h6>
                                  </div>
                                </div>
                              ))
                            }
                          </ListGroup>

                        </div>

                      </div>
                    )
                  }


                </motion.div>

              </div>
            </Col>



            <Col lg='4'>
              <Booking tour={tour} avgRating={avgRating} />
            </Col>
          </Row>
        }
      </Container>
    </section>

  </>
}

export default TourDetail