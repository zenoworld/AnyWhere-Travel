import React from 'react';
import {motion} from 'framer-motion';
import '../style/about.css'

const About = () => {
    return (
        <motion.div
        initial={{ opacity: 0 ,y: -450}}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
         className="about-container">
            <h2>About Our Travel Company</h2>
            <p>Welcome to our travel company! We specialize in providing unforgettable travel experiences tailored to your needs.</p>
            
            <h3>Our Features</h3>
            <ul>
                <li>Customized travel packages</li>
                <li>Expert tour guides</li>
                <li>Luxurious accommodations</li>
                <li>24/7 customer support</li>
                <li>Flexible booking options</li>
            </ul>

            <h3>Our Mission</h3>
            <p>Our mission is to create lifelong memories for our customers by delivering exceptional travel experiences.</p>

            <h3>Why Choose Us?</h3>
            <p>With our extensive industry expertise and dedication to customer satisfaction, we are your trusted partner in travel.</p>

            <h3>Meet Our Team</h3>
            <p>Our team of passionate travel enthusiasts is committed to making your journey unforgettable. Meet the faces behind our company!</p>
            
            {/* You can add more sections as needed */}

        </motion.div>
    );
};

export default About;
