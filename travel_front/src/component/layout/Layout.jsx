import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from './../header/Header'
import Footer from './../footer/Footer'
import Router from '../../router/Router'

const Layout = () => {
  const location = useLocation()
  // const hideHeader =[ '/login', '/register']
  // const hideFooter =[ '/login', '/register', '/adminpage','/adminpage/team', '/adminpage/user', '/adminpage/contacts', '/adminpage/invoices',' /adminpage/weatherpage', '/adminpage/form', '/adminpage/edit', '/adminpage/viewTours', '/adminpage/bar', '/adminpage/pie', '/adminpage/line', '/adminpage/faq', '/adminpage/calendar']
   const hideFooter = ['/home']
  
  return <>
    {/* {!hideHeader.includes(location.pathname) && <Header/>} */}
    <Header/>
    <Router/>
    {hideFooter.includes(location.pathname) && <Footer/>}    
  </>
}

export default Layout