import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import galleryImg from './galleryImg'
import { motion } from 'framer-motion'

import '../style/home.css'

const fadeImg = {
  hidden: { opacity: 0, x: -300},
  visible: {
    opacity: 1,
    x: 0,
  
  },
}
const Masonygallery = () => {
  return <>
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 3, 992: 4 }}>
      <Masonry gutter='1rem'>
        {
          galleryImg.map((item, index) => (
            <motion.div
              variants={fadeImg}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.15 * (galleryImg.length - index), ease: 'easeInOut' }}
              className='container1' key={index}>
              <div className='cards'>
                <img src={item.src} alt='' width={450} height={410} />
              </div>
              <div className='content'>
                <h1>{item.title}</h1>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))
        }
      </Masonry>
    </ResponsiveMasonry>
  </>
}

export default Masonygallery
