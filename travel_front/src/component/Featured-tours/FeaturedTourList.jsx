import React from 'react'
import { Col } from 'react-bootstrap'
import HomeToureCard from '../../shared/HomeTourCard';
import useFetch from '../../hooks/useFetch'
import { BASE_URL } from './../../utils/config'
import tours from '../../data/data/tours'
import calculateAvgRating from '../../utils/calculateAvgRating';
const FeaturedTourList = () => {

  const { data: featuredTours, loading, error } = useFetch(`${BASE_URL}/tour/search/getFeaturetour`);

  const sortedTours = featuredTours?.slice().sort((a, b) => {
  const { avgRating: avgA } = calculateAvgRating(a.reviews);
  const { avgRating: avgB } = calculateAvgRating(b.reviews);

  if (avgB !== avgA) {
    return avgB - avgA; 
  }
  return b.reviews.length - a.reviews.length;
});



  return (<>
    {loading && <h4>Loading.........</h4>}
    {error &&
      tours.map(tour => (
        <Col lg='4' md='6' sm='6' className='mb-4' key={tour._id}>
          <HomeToureCard tour={tour} />
        </Col>
      ))
    }
    {
      !loading && !error &&

      sortedTours?.map(tour => (
        <Col lg='3' md='6' sm='6' className='mb-4' key={tour._id}>
          <HomeToureCard tour={tour} />
        </Col>
      ))
    }


  </>
  );


};

export default FeaturedTourList