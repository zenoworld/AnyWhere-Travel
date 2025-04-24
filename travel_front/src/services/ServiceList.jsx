
import React from 'react'
import ServiceCard from './ServiceCard'


import weatherImg from '../data/image/weather.png'
import guideImg from '../data/image/guide.png'
import customizationImg from '../data/image/customization.png'

import { motion } from 'framer-motion'
const servicesData = [
    {
        imgUrl: weatherImg,
        title: "Check Weather",
        desc: "KNOW THE WEATHER BEFORE YOU GO",
        navigate: "/weather"
    },
    {
        imgUrl: guideImg,
        title: "Best Tour Guide",
        desc: "BEST TOUR GUIDES FOR YOU",
        navigate: "https://aitrip.tubeguruji.com/create-trip"
    },
    {
        imgUrl: customizationImg,
        title: "Customization",
        desc: "CUSTOMIZE YOUR OWN JOURNEY",
        navigate: "https://customiseyourtrip.com/'"
    },
    {
        imgUrl: customizationImg,
        title: "Customization",
        desc: "CUSTOMIZE YOUR OWN JOURNEY",
        navigate: "https://customiseyourtrip.com/'"
    },
]

const ServiceList = () => {
    return <>
        {
            servicesData.map((item, index) =>
                <motion.div
                    initial={{ opacity: 0,x:300 }}
                    animate={{ opacity: 1 ,x:0}}
                    transition={{ duration: 0.4*index ,ease:'easeInOut'}}
                    className='mb-6' key={index}
                >
                    <ServiceCard item={item} />
                </motion.div>)
        }
    </>
}

export default ServiceList