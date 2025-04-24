import React from 'react'
import { Link } from 'react-router-dom'
import './service-card.css'
import right from '../data/image/fast-forward.png'
const ServiceCard = ({ item }) => {
  const { imgUrl, title, desc, navigate } = item
  return <div className='service__item'>
    <div className='service__img'>
      <img src={imgUrl} alt='...' />
    </div>
    <h5>{title}</h5>
    <p><b>{desc}</b></p>
    <Link to={navigate}><p className='link-p'>click here<img src={right} alt='' width="20px" height="15px" /></p></Link>
  </div>
}

export default ServiceCard