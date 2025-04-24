import React from 'react'

import Slider from 'react-slick'
import ava01 from '../../data/image/ava-1.jpg'
import ava02 from '../../data/image/ava-2.jpg'
import ava03 from '../../data/image/ava-3.jpg'
import '../Testimonial/Testimonial.css'
const Testimonial = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 2000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidesToShow:3,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    
    return <Slider {...settings}>
        <div className='testimonial py-4 px-3'>
            <p>Open-source neutral-style system symbols elaborately crafted
             for designers and developers.
                All of the icons are free for both personal and commercial 
                use.
            </p>
            <div className='d-flex align-items-center gap-4 mt-3 '>
                <img src={ava01} alt='avatar1' className='w-25 h-25 rounded-2' />
                <div >
                    <h5 className='name mb-0 mt-3 '>Subhro Majumder</h5>
                    <p>Customer</p>
                </div>
            </div>
        </div>
        <div className='testimonial py-4 px-3'>
            <p>Open-source neutral-style system symbols elaborately crafted
             for designers and developers.
                All of the icons are free for both personal and commercial 
                use.
            </p>
            <div className='d-flex align-items-center gap-4 mt-3 '>
                <img src={ava02} alt='avatar2' className='w-25 h-25 rounded-2' />
                <div >
                    <h5 className='name mb-0 mt-3 '>Aditya Bose</h5>
                    <p>Customer</p>
                </div>
            </div>
        </div>
        <div className='testimonial py-4 px-3'>
            <p>Open-source neutral-style system symbols elaborately crafted
             for designers and developers.
                All of the icons are free for both personal and commercial 
                use.
            </p>
            <div className='d-flex align-items-center gap-4 mt-3 '>
                <img src={ava03} alt='avatar3' className='w-25 h-25 rounded-2' />
                <div >
                    <h5 className='name mb-0 mt-3 '>Tamal Saha</h5>
                    <p>Customer</p>
                </div>
            </div>
        </div>
        <div className='testimonial py-4 px-3'>
            <p>Open-source neutral-style system symbols elaborately crafted
             for designers and developers.
                All of the icons are free for both personal and commercial 
                use.
            </p>
            <div className='d-flex align-items-center gap-4 mt-3 '>
                <img src={ava03} alt='avatar3' className='w-25 h-25 rounded-2' />
                <div >
                    <h5 className='name mb-0 mt-3 '>Abhishek Gorain</h5>
                    <p>Customer</p>
                </div>
            </div>
        </div>
        <div className='testimonial py-4 px-3'>
            <p>Open-source neutral-style system symbols elaborately crafted
             for designers and developers.
                All of the icons are free for both personal and commercial 
                use.
            </p>
            <div className='d-flex align-items-center gap-4 mt-3 '>
                <img src={ava03} alt='avatar3' className='w-25 h-25 rounded-2' />
                <div >
                    <h5 className='name mb-0 mt-3 '>Sanju Majumder</h5>
                    <p>Customer</p>
                </div>
            </div>
        </div>
    </Slider>
}

export default Testimonial