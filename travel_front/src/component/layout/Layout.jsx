import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from './../header/Header'
import Footer from './../footer/Footer'
import Router from '../../router/Router'

const Layout = () => {
  const location = useLocation()

  const hideFooterPaths = ['/login', '/register', '/adminpage', '/adminpage/team'];

  return <>
    <Header />
    <Router />
    {!hideFooterPaths.includes(location.pathname) && <Footer />}
  </>
}

export default Layout