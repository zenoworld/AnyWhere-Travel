import React from 'react'
import {Row, Col } from 'reactstrap'
import { motion } from 'framer-motion'

import './commonsection.css'

const CommanSection = ({ title }) => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.5, ease: 'easeInOut' } }}
            className='commonsection'>
            <motion.Container
                initial={{ opacity: 0, y: 250 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 1, ease: 'easeInOut' } }}
            >
                <Row>
                    <Col lg='12'>
                        <h1>{title}</h1>
                    </Col>
                </Row>
            </motion.Container>
        </motion.section>
    )
}

export default CommanSection