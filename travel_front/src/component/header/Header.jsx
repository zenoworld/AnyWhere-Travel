import React, { useEffect, useRef, useContext } from 'react'
import { Container, Row, Button } from 'reactstrap'
import { NavLink, Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext)


  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/')
  };

  const stickyheaderfunction = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerref.current.classList.add('sticky__header')
      } else {
        headerref.current.classList.remove('sticky__header')
      }
    })
  }

  useEffect(() => {
    stickyheaderfunction()
    return window.removeEventListener('scroll', stickyheaderfunction)
  }, [])

  const toggleMenu = () => menuref.current.classList.toggle('show__menu')
  return (
    <header className='header' ref={headerref}>
      <Container>
        <Row>
          <div className='nav__wrapper d-flex align-items-center justify-content-between'>
            {/* /logo */}
            <div className='logo'>
              <img src={logo} alt='...'></img>
            </div>
            {/* /logo end */}

            {/* /menu start */}
            <div className='navigation ' ref={menuref} onClick={toggleMenu}>
              <ul className='menu d-flex align-items-center gap-5'>
                {
                  nav_link.map((item, index) => (
                    (user && user.role === 'user' && item.path === '/adminpage') || (!user && item.path === '/adminpage') ?
                      null :
                      <motion.li
                        initial={{ opacity: 0, y: -150 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.2 * (nav_link.length -index), ease: 'easeInOut' } }}
                        className='nav__item' key={index}>
                        <NavLink to={item.path} className={navClass => navClass.isActive ? 'active__link' : ""}>{item.display}</NavLink>
                      </motion.li>
                  ))
                }

              </ul>
            </div>

            <div className='nav__right d-flex align-items-center gap-4'>
              <div className='nav__btns d-flex align-items-center gap-4'>

                {
                  user ? (<>
                    <h5 className='user_h5 mb-0'>{user.username}</h5>
                    <Button className='btn btn-danger' onClick={logout}>LOGOUT</Button>
                  </>) :
                    (<>
                      <div className="auth-buttons">
                        <div className='auth-buttons-inner'>

                          <div className='button-inner-div-login' >
                            <Link to="/login" >
                              Login
                            </Link>
                          </div>
                          <div className='button-inner-div-register' >
                            <Link to="/register">
                              Register
                            </Link>
                          </div>

                        </div>
                      </div>

                    </>)
                }
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
}

export default Header