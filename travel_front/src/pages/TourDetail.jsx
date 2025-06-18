import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import calculateAvgRating from '../utils/calculateAvgRating';
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "./../context/AuthContext";
import { Container, Row, Col, Form } from "react-bootstrap";
import { motion } from 'framer-motion'

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

import '../style/tourdetail.css'
import ReviewContainer from "../component/reviewContainer/ReviewContainer";
import Loading from "../component/loading/Loading";
import Booking from "../pages/Booking";
// import Review from "../component/reviewContainer/Review";


const TourDetail = () => {

  const { id } = useParams();
  const reviewMSgRef = useRef('');
  const [tourRating, setTourRating] = useState(0);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [bookingContainerOpen, setBookingContainerOpen] = useState(false)

  const { user } = useContext(AuthContext)

  //fetch data
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tour/${id}`)

  const { photo, title, desc, pricePerDay, address, city, maxGroupSize, remainingSlots, bookedPersonCount, reviews } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews)

  const submitHandler = async e => {
    e.preventDefault();
    const reviewText = reviewMSgRef.current.value;

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
        {loading && <Loading />}
        {error && <h4 className="text-center pt-5">{error}</h4>}

        {
          !loading && !error && <Row className="row_tour">

            <Col lg='8' className='tour__detail_left'>
              <div className='tour__content'>

                <motion.div
                  initial={{ opacity: 0, x: -300 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
                  className='tour__info'>

                  <h2 className="d-flex ">
                    {title}<span className='tour__rating_simple d-flex align-items-center gap-1 mx-4'>
                      <i className="ri-star-fill" style={{ 'color': "gold" }}></i>
                      {avgRating === 0 ? "0 Reviews" : avgRating}
                      {totalRating === 0 ?
                        ("0 Reviews")
                        : (
                          <span>
                            ({reviews?.length} reviews)
                          </span>
                        )}
                    </span>

                  </h2>

                  <div className='d-flex justify-content-between align-items-center gap-5'>

                    <span>
                      🌍{address}
                    </span>

                    <span>
                      <i className="ri-map-pin-fill" style={{ color: "rgb(23, 178, 3)" }}></i>{city}
                    </span>
                  </div>

                  <div className='d-flex justify-content-between align-items-center tour__extra-details'>

                    <span>
                      <i className="ri-money-dollar-circle-line" style={{ 'color': "rgb(54, 114, 114)" }}></i>${pricePerDay} / person
                    </span>

                    <span>
                      <i className="ri-group-line" style={{ 'color': "rgb(84, 209, 209)" }}></i>
                      {maxGroupSize} people
                    </span>

                    <span>
                      <i className="ri-group-line" style={{ 'color': "rgb(84, 209, 209)" }}></i>
                      {remainingSlots} Remaining Slots
                    </span>

                    <span>
                      <i className="ri-group-line" style={{ 'color': "rgb(84, 209, 209)" }}></i>
                      {bookedPersonCount} Booked Slots
                    </span>

                  </div>

                  {/* <h5>Description</h5>
                  <p>{desc}</p> */}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -550 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 1, ease: 'easeInOut' } }}
                  className='tour__reviews mt-3'>

                  <div className="mb-4 d-flex justify-content-between">
                    <h4>Share your Experience</h4>
                    <button
                      onClick={() => setReviewOpen(!reviewOpen)}
                      className="review_button"
                    >
                      View all Reviews
                    </button>
                  </div>

                  <Form onSubmit={submitHandler}>

                    <div className='d-flex align-items-center gap-4 mb-4 rating__group'>

                      {
                        [1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            onClick={() => setTourRating(star)}
                            className={tourRating < star ? "" : "blue-star"}
                          >
                            {star} <i className="ri-star-s-fill"></i>
                          </span>

                        ))
                      }

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




                </motion.div>

              </div>
            </Col>

            <Col lg='4' className='tour__detail_right'>
              <div className='descSection'>
                <div className='image_div'>
                  <img src={photo} alt='tourPic' />
                </div>

                <div className='descSection_div'>
                  <div>
                    <h5>Description</h5>
                    <p>
                      {desc}
                    </p>
                  </div>

                  <Button
                    onClick={() => setBookingContainerOpen(!bookingContainerOpen)} variant="contained"
                    color="primary"
                    className="mt-3">
                    Book You Destination
                  </Button>
                </div>
              </div>
            </Col>

            {
              reviewOpen && (
                <div className="absolute_section">
                  <div className="review_section_inner">
                    <div
                      onClick={() => setReviewOpen(!reviewOpen)}
                      className="close_review"
                    >
                      <span>X</span>
                    </div>
                    <ReviewContainer id={id} />
                  </div>
                </div>
              )
            }

            {
              bookingContainerOpen &&
              <div className="absolute_section">
                <div className="booking_section_inner">
                  <div
                    onClick={() => setBookingContainerOpen(!bookingContainerOpen)}
                    className="close_review"
                  >
                    <span>X</span>
                  </div>
                  <Booking tour={tour} />
                </div>
              </div>
            }
            
          </Row>
        }
      </Container>
    </section>

  </>
}

export default TourDetail