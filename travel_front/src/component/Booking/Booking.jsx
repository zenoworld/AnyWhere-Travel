import React, { useState, useContext } from 'react'
import { Form,  Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';
import {motion} from 'framer-motion';

import './booking.css';



const Booking = ({ tour, avgRating }) => {
    const { pricePerDay, reviews, title } = tour;

    const navigate = useNavigate();
    const { user } = useContext(AuthContext)

    const [booking, setBooking] = useState({
        userId: user && user._id,
        userEmail: user && user.email,
        tourName: title,
        fullName: '',
        phone: '',
        guestSize: '',
        bookAt: ''

    });
    const handleChanger = (e) => {
        setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }))
    };
    const servesfee = 10;
    const totalAmount = Number(pricePerDay) * Number(booking.guestSize) + Number(servesfee)

    const handleClick = async e => {
        e.preventDefault();
        console.log(booking)
        try {
            if (!user || user === undefined || user === null) {
                return alert("please sign in");
            }
            const res = await fetch(`${BASE_URL}/booking`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(booking)
            })
            const result = await res.json()
            if (!res.ok) {
                return alert(result.message)
            }
            navigate('/paystack')
        } catch (err) {
            alert(err.message)
        }
    }

    return <>
        <motion.div
        initial={{ opacity: 0 ,x: 450}}
        animate={{ opacity: 1, x: 0, transition: { duration: 1, ease: 'easeInOut' } }}
         className='booking'>
            <div className='booking__top d-flex align-items-center justify-content-between'>
                <h3>${pricePerDay} <span>/person</span></h3>
                <span className='tour__rating d-flex align-items-center '>
                    <i class="ri-star-fill" ></i>
                    {avgRating === 0 ? null : avgRating} ({reviews?.length})
                </span>
            </div>
            <div className='booking__form '>
                <h5>Information</h5>
                <Form className='booking__info-form ' onSubmit={handleClick}>
                    <input type='text' placeholder='fullName' id='fullName' onChange={handleChanger} required />


                    <input type='number' placeholder='phone' id='phone' onChange={handleChanger} required />


                    <div className='d-flex align-items-center gap-3 '>
                        <input type='date' placeholder='' id='bookAt' onChange={handleChanger} required />
                        <input type='number' min={0} placeholder='guest' id='guestSize' onChange={handleChanger} required />
                    </div>
                </Form>
            </div>
            {/* botton */}
            <div className='booking__bottom'>
                <div className='booking__bottom_inner'>
                    <div className='details_div border-0 px-0'>
                        <h5>Service Charges</h5>
                        <span>{servesfee}$</span>
                    </div>
                    <div className='details_div border-0 px-0 total'>
                        <h5>Total</h5>
                        <span>{totalAmount}$</span>
                    </div>
                </div>
                <Button className='btn  w-100 mt-4' type='submit' style={{background:"rgb(33, 62, 125)"}} onClick={handleClick}>BOOK NOW</Button>
            </div>
        </motion.div>
    </>

}

export default Booking