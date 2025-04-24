import React, { useState } from 'react'
import CommanSection from './../shared/CommanSection'
import { Container,Row,Col } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import ToureCard from '../shared/ToureCard'
import  NewsLetter from '../shared/NewsLetter'

const Searchlist = () => {

  const location =useLocation();
  const [data]=useState(location.state)
 
  return (
    <>
      <CommanSection title={"tour search result"}/>
        <section>
          <Container>
            <Row>
             {
              data.length === 0 ?(<h4 className='text-center'>no tour found</h4>):(data?.map
              (tour=>
              <Col lg="3" className='mb-4' key={tour._id}>
              
                <ToureCard tour={tour}/>
              </Col>))
             }
            </Row>
          </Container>
        </section>
        <NewsLetter/>
     
    </>
  )
}

export default Searchlist