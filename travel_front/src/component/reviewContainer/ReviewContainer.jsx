import React, { useEffect } from 'react'
import avatar from '../../data/image/avatar.jpg'
import useFetch from '../../hooks/useFetch'
import { BASE_URL } from "../../utils/config";
import { ListGroup } from 'react-bootstrap';
import '../../style/tourdetail.css'
import Loading from '../loading/Loading';


const ReviewContainer = ({ id }) => {

    const { data: reviews, loading, error } = useFetch(`${BASE_URL}/review/${id}`)
    const options = { day: 'numeric', month: 'long', year: 'numeric' }

    return <>

        {loading && <Loading />}
        {error && <h4 className="text-center pt-5">{error}</h4>}
        {
            !loading && !error && <ListGroup className='user__reviews'>
                {
                    reviews?.map(review => (
                        <div className="review__item">
                            <div className='review__item_left'>
                                <img src={avatar} alt="avatar" />
                            </div>

                            <div className=' review__item_right'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div>
                                        <h5>{review.username}</h5>
                                        <p>{new Date(review.createdAt).toLocaleDateString("en-US", options)}</p>
                                    </div>
                                    <span className='d-flex  align-items-center'>
                                        {review.rating}<i className="ri-star-s-fill" style={{ 'color': "gold" }}></i>
                                    </span>
                                </div>
                                <h6>{review.reviewText}</h6>
                            </div>
                        </div>
                    ))
                }
            </ListGroup>

        }
    </>
}

export default ReviewContainer