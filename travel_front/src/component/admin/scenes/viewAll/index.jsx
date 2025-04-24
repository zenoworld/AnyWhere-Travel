import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap';
import AllViewTours from "../../AdminComponents/adminTourCard/AllViewTours";
import useFetch from '../../../../hooks/useFetch'
import { BASE_URL } from '../../../../utils/config';
import Header from '../../AdminComponents/Header';


const ViewTours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const { data: tours, loading, error } = useFetch(`${BASE_URL}/tour/adminPageTour?page=${page}`)
  const { data: tourCount } = useFetch(`${BASE_URL}/tour/search/getTourCount`)

  useEffect(() => {
    const pages = Math.ceil(tourCount / 6);// backend work
    setPageCount(pages);
    window.scrollTo(0, 0)
  }, [page, tourCount, tours]);



  return <>
    <section className='pt-0'>
      <Container style={{ padding: '1rem 1rem' }}>
        <Header title={"View Tour"} subtitle={"View All the Tour Packages"} />
      </Container>
      <Container>

        {loading && <h4 className='text-center pt-5'>Loading.....</h4>}
        {error && <h4 className='text-center pt-5'>{error}</h4>}
        {
          !loading && !error &&
          <Row>

            {
              tours?.map(tour => (
                <Col lg='4' md='6' sm='6' className='mb-4' key={tour._id}>
                  <AllViewTours tour={tour} />
                </Col>
              ))}
            <Col lg='12'>
              <div className='pagination d-flex align-items-center justify-content-center mt-4 gap-3'>
                {
                  [...Array(pageCount).keys()].map(number => (
                    <span key={number} onClick={() => setPage(number)}
                      className={page === number ? 'active__page' : " "}>
                      {number + 1}
                    </span>
                  ))
                }

              </div>

            </Col>
          </Row>
        }
      </Container>
    </section>
  </>
}

export default ViewTours