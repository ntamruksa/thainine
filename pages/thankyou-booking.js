import { withRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Container, Row, Col } from 'react-bootstrap'
import api from '../services/API'

// import styles from '../styles/Home.module.css'

const ThankyouBooking = withRouter(
  ({
    router: {
      query: { bookingId }
    }
  }) => {
    const [reservation, setReservation] = useState({})
    useEffect(() => {
      console.log('load menu')
      async function fetchData() {
        const response = await api.getBooking(bookingId)
        setReservation(response)
      }
      fetchData()
    }, [])

    return (
      <Container>
        <section className='section-thankyou'>
          <div className='u-center-text u-margin-bottom-big'>
            <h2 className='heading-secondary u-margin-bottom-small'>
              Thank you for booking.
            </h2>
            <p className='paragraph-main px-4 mb-0'>
              Your reservation details is:
            </p>
            <p>** For same day booking on Friday and Saturday please wait for our call to confirm your booking **</p>
            <Row>
              <Col className='text-right px-0'>Name:</Col>
              <Col className='text-left'>{`${reservation.firstName} ${reservation.lastName}`}</Col>
            </Row>
            <Row>
              <Col className='text-right px-0'>Date:</Col>
              <Col className='text-left'>{`${reservation.date}`}</Col>
            </Row>
            <Row>
              <Col className='text-right px-0'>Time:</Col>
              <Col className='text-left'>{`${reservation.time}`}</Col>
            </Row>
            <Row>
              <Col className='text-right px-0'>Party of:</Col>
              <Col className='text-left'>{`${reservation.party}`}</Col>
            </Row>
            <Row>
              <Col className='text-right px-0'>Contact number:</Col>
              <Col className='text-left'>{`${reservation.phone}`}</Col>
            </Row>
            <p className='paragraph-main p-4'>
              If any change please contact us on <br />
              <a href='tel:99607454'>(02) 9960 7454</a> or{' '}
              <a href='tel:99607453'>(02) 9960 7453</a>. <br />
              We are looking forward to seeing you.
            </p>
            <Link href='/menu'>
              <a className='btn-text'>See our meals &rarr;</a>
            </Link>
          </div>
        </section>
      </Container>
    )
  }
)

export default ThankyouBooking
