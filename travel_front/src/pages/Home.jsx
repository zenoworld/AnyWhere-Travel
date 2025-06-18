import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { motion } from 'framer-motion';
import Subtitle from '../shared/Subtitle'
import ServiceList from '../services/ServiceList'
import FeaturedTourList from '../component/Featured-tours/FeaturedTourList'
import Masonygallery from '../imageGallery/Masonygallery'
import Testimonial from '../component/Testimonial/Testimonial'
import NewsLetter from '../shared/NewsLetter'

import arrow from '../data/image/r-arrow.png'
import worldImg from '../data/image/world.png';
import walkingMan from '../data/image/landingpage_icon.png'

import { AuthContext } from '../context/AuthContext'
import '../style/home.css'

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext)
  const navigateLogin = () => {
    navigate('/login')
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.5, ease: 'easeInOut' }, // Slow animation
    },
  };
  const leftSlide = {
    hidden: { opacity: 0, x: -150 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeInOut' }, // Slow animation
    },
  };
  const rightSlide = {
    hidden: { opacity: 0, x: 150 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeInOut' }, // Slow animation
    },
  };
  const upSlide = {
    hidden: { opacity: 0, y: -350 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.1, ease: 'easeInOut' }, // Slow animation
    },
  };
  const downSlide = {
    hidden: { opacity: 0, y: 350 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.1, ease: 'easeInOut' }, // Slow animation
    },
  };

  return <>

    {/* Hero Section */}
    <motion.section
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      viewport={{ once: false }}
      className="home-sec1 mb-5"
    >
      <div className='home_overlay'></div>
      <div className="hero__content">

        <motion.h1
          initial={{ opacity: 0, x: -350 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        >
          <span className="hell">TRAVEL BEYOND LIMITS </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, x: -150 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 1, ease: 'easeInOut' } }}
          className='hell1'>
          <h1>
            Explore, Thrive
            <span className="highlight">!</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: -250 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 1, ease: 'easeInOut' } }}
        >
          Embark on your next adventure with ease! Discover breathtaking
          destinations, plan unforgettable experiences, and book your dream
          tours—all in one place.
          your wanderlust lead the way!
        </motion.p>
        {user ? "" :
          <div className="home-login-btn-div" onClick={navigateLogin}>
            <div className="home-login-btn"><span>Login</span></div>
            <img src={arrow} alt="" width="50px" height="40px" />
          </div>
        }

      </div>
    </motion.section>

    {/* Services Section */}
    <section
      className='serviceList_section'
    >
      <Container className='serviceList_container'>
        <Row>
          < motion.div
            variants={leftSlide}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <h3 className="services__subtitle">Know before You go</h3>
            <h2 className="services__title">We Offer Our<span>Best Services</span></h2>
            <div className='earth_container'>
              <div className='earth'>
                <img src={worldImg} alt='world' />
              </div>
              <div className='shadow'>
                <img src={worldImg} alt='world' />
              </div>
            </div>

          </motion.div>

        </Row>
        <motion.div
          variants={rightSlide}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className='serviceList_container_inner1'>
          <div className='servicecard'>
            <ServiceList />
          </div>
        </motion.div>
      </Container>
    </section>

    {/* Featured Tours Section */}
    <motion.section
      variants={rightSlide}
      initial={{ opacity: 0, x: 250 }}
      whileInView="visible"
      transition={{ duration: 1.5 }}
      viewport={{ once: false }}
    >
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <Subtitle Subtitle="Popular Tours" className="subtitle-explore" />
            <h2 className="featured__tour-title">Our featured tours</h2>
          </Col>
          <FeaturedTourList />
        </Row>
      </Container>
    </motion.section>

    {/* Experience Section */}
    <motion.section
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
    >
      <Container>
        <Row>
          <Col lg="6">
            <div className="experience__img">
              <motion.img
                variants={leftSlide}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                src={walkingMan} alt="experience" />
            </div>
          </Col>

          <Col lg="6" className="new">
            <motion.div
              variants={rightSlide}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="experience__content">
              <Subtitle Subtitle="Experience" className="subtitle-experience" />
              <h2 className="hello">
                With all our experience <br /> <span>we will serve you</span>{' '}
              </h2>
              <p>
                Open-source neutral-style system symbols elaborately <br />
                Open-source neutral-style system symbols e
              </p>
            </motion.div>
            <motion.div
              variants={rightSlide}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="counter__wrapper d-flex align-items-center  gap-5">
              <div className="counter__box">
                <span>1k+</span>
                <h6>Successful Trips</h6>
              </div>
              <div className="counter__box">
                <span>300+</span>
                <h6>Regular Clients</h6>
              </div>
              <div className="counter__box">
                <span>3</span>
                <h6>Years of Experience</h6>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.section>

    {/* Gallery Section */}
    <motion.section
      variants={leftSlide}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
    >
      <Container>
        <Row>
          <Col lg="12">
            <Subtitle Subtitle="Gallery" className="subtitle-gallery" />
            <h2 className="gallery__title">Visit Our Client's<br /> <span>Tour Gallery</span></h2>
          </Col>
        </Row>
        <Masonygallery />
      </Container>
    </motion.section>

    {/* Testimonials Section */}
    <motion.section
      variants={downSlide}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
    >
      <Container>
        <Row>
          <Col lg="12">
            <Subtitle Subtitle="Fans love" className="subtitle-fans-love" />
            <h2 className="testimonial__title">
              What People Have Said<br /> <span>About Our Service</span>
            </h2>
          </Col>
          <Col lg="12">
            <Testimonial />
          </Col>
        </Row>
      </Container>
    </motion.section>

    {/* Newsletter Section */}
    <motion.section
      variants={upSlide}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
    >
        <Row>
          <Col lg="12">
            <Subtitle Subtitle="Send Love" className="subtitle-fans-love" />
            <h2 className="testimonial__title">
              Send Tour Experience<br /> <span>With Us</span>
            </h2>
          </Col>
        </Row>
          <NewsLetter />
     
    </motion.section>
  </>
}

export default Home