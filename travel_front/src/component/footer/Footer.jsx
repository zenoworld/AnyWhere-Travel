import React from 'react'
import './footer.css'
import { Container, Row, Col, ListGroup, ListGroupItem, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '/logo.jpg';

const quick_link = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/about',
    display: 'About'
  },
  {
    path: '/tour',
    display: 'Tour'
  },
];
const quick_link1 = [
  {
    path: '/about',
    display: 'About Us'
  },
  {
    path: '/',
    display: 'News'
  },
  {
    path: '/',
    display: 'Faq'
  },
];
const quick_link02 = [

  {
    path: '/login',
    display: 'Login'
  },
  {
    path: '/register',
    display: 'Register',
  },
  {
    path: '/main',
    display: 'Admin',
  },

];


const Footer = () => {



  return <footer className='footer'>
    <Container>
      <Row className='row1'>

        <Col lg='3'>
          <h5 className='footer__link_title'>Company</h5>
          <ListGroup className='footer__quick'>
            {
              quick_link1.map((item, index) => (
                <ListGroupItem key={index} className='foot ps-0 border-0'>
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))
            }

          </ListGroup>
        </Col>

        <Col lg='3'>
          <h5 className='footer__link_title'>Discover</h5>
          <ListGroup className='footer__quick'>
            {
              quick_link.map((item, index) => (
                <ListGroupItem key={index} className='foot ps-0 border-0'>
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))
            }

          </ListGroup>
        </Col>
        <Col lg='3'>
          <h5 className='footer__link_title'>Quick Links</h5>
          <ListGroup className='footer__quick'>
            {
              quick_link02.map((item, index) => (
                <ListGroupItem key={index} className='foot ps-0 border-0 ' >
                  <Link to={item.path} >{item.display}</Link>
                </ListGroupItem>
              ))
            }

          </ListGroup>
        </Col>


        <Col lg='3'>

          <h5 className='footer__link_title'>Contact</h5>
          <ListGroup className='footer__quick'>
            <ListGroupItem className='foot ps-0 border-0 d-flex align-items-center gap-3'>
              <h6 className='mb-0 d-flex align-items-center gap-2'>
                <span>
                  <i class="ri-map-pin-line"></i>
                </span>
                Address
              </h6>
              <p className='mb-0'>XYZ,INDIA</p>
            </ListGroupItem>

            <ListGroupItem className='foot ps-0 border-0 d-flex align-items-center gap-3'>
              <h6 className='mb-0 d-flex align-items-center gap-2'>
                <span>
                  <i class="ri-mail-line"></i>
                </span>
                Email
              </h6>
              <p className='mb-0'>fourarms@gmail.com</p>
            </ListGroupItem>

            <ListGroupItem className='foot ps-0 border-0 d-flex align-items-center gap-3'>
              <h6 className='mb-0 d-flex align-items-center gap-2'>
                <span>
                  <i class="ri-phone-fill"></i>
                </span>
                Phone no
              </h6>
              <p className='mb-0'>8697366627</p>
            </ListGroupItem>

          </ListGroup>

        </Col>
      </Row>


      <div className='footer_bottom'>
        <h2>© 2025. All rights reserved</h2>
        <div className='social__links d-flex  align-items-center gap-4'>
          <span>
            <Link to='#'>
              <i class="ri-youtube-line"></i>
            </Link>
          </span>
          <span>
            <Link to='#'>
              <i class="ri-github-fill"></i>
            </Link>
          </span>
          <span>
            <Link to='#'>
              <i class="ri-facebook-circle-line"></i>
            </Link>
          </span>
          <span>
            <Link to='#'>
              <i class="ri-instagram-line"></i>
            </Link>
          </span>
        </div>
      </div>

    </Container>
  </footer>
}

export default Footer