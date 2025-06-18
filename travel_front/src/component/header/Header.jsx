import React, { useEffect, useRef, useContext } from 'react'
import { Container, Row, Button } from 'reactstrap'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../data/image/app_logo.png'
import { motion } from 'framer-motion';
import './header.css';

import { AuthContext } from './../../context/AuthContext';

const nav_link = [
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
  {
    path: '/adminpage',
    display: 'Dashboard'
  },

]
const Header = () => {

  const headerref = useRef(null);
  const menuref = useRef(null);
  const logoRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext)

  const location = useLocation();
  const hideHeaderTop = ['/home', '/tour', '/about'];
  const isTourDetailsPage = location.pathname.startsWith('/tour/') && location.pathname.split('/').length === 3;

  const shouldShowHeaderTop = hideHeaderTop.includes(location.pathname) || isTourDetailsPage;



  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/')
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        headerref.current.classList.add('sticky__header');
        logoRef.current.classList.add('visible');
      } else {
        headerref.current.classList.remove('sticky__header');
        logoRef.current.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const toggleMenu = () => menuref.current.classList.toggle('show__menu')


  return (
    <header className='header'>
      <Container>

        {shouldShowHeaderTop && (
          <div className='header_top'>
            <div className='logo'>
              <img src={logo} alt='...'></img>
            </div>

            <div className="contact__info">
              <div className="contact__info_inner">
                <img src='/gmail.png' alt='email' />
                <strong>xyz@gmail.com</strong>
              </div>
              <div className="contact__info_inner">
                <img src='/telephone.png' alt='phone' />
                <strong>( +91 ) 8697366627</strong>
              </div>
            </div>
          </div>
        )}



        <div
          className='header_bottom d-flex align-items-center justify-content-between' ref={headerref}>

          <div className='logo_bottom_header' ref={logoRef}>
            <img src={logo} alt='...'></img>
          </div>

          <div className='header_bottom_left' ref={menuref} onClick={toggleMenu}>
            <ul className='nav_menu d-flex align-items-center gap-5'>
              {
                nav_link.map((item, index) => (
                  (user && user.role === 'user' && item.path === '/adminpage') || (!user && item.path === '/adminpage') ? null :
                    <motion.li
                      initial={{ opacity: 0, y: -150 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: 0.2 * (nav_link.length - index), ease: 'easeInOut' } }}
                      className='nav__item'

                      key={index}
                    >
                      <NavLink
                        to={item.path}
                        className={navClass => navClass.isActive ? 'active__link' : ""}
                      >
                        {item.display}
                      </NavLink>
                    </motion.li>
                ))}
            </ul>
          </div>


          <div className='header_bottom_right d-flex align-items-center gap-4'>
            <div className=' d-flex align-items-center gap-4'>
              {user ? (
                <>
                  <h5 className='user_h5 mb-0'>{user.username}</h5>
                  <Button color="danger" onClick={logout}>
                    LOGOUT
                  </Button>

                </>
              ) : (
                <div className="auth-buttons">
                  <div className='auth-buttons-inner'>
                    <div className='button-inner-div-login'>
                      <Link to="/login">Login</Link>
                    </div>
                    <div className='button-inner-div-register'>
                      <Link to="/register">Register</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </Container>
    </header>

  );
}

export default Header