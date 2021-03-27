import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, Container, Carousel } from 'react-bootstrap'

// import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
    <Container>
    <section className='section section-hero' />
    <section className='section section-carousel'>
          <Carousel>
            <Carousel.Item>
              <img
                className='d-block w-100'
                src='/thainine-banana-blossom.jpg'
                alt='First slide'
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className='d-block w-100'
                src='/thainine-roll.jpg'
                alt='Third slide'
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className='d-block w-100'
                src='/thainine-meang.jpg'
                alt='Third slide'
              />
            </Carousel.Item>
          </Carousel>
    </section>
    <section className='section section-aboutus'>
      <div className='u-center-text u-margin-bottom-big'>
        <h2 className='heading-secondary'>Welcome to Thai Nine</h2>
      </div>
      <Row className='mx-4'>
            <Col sm={6} xs={12} className='my-4'>
                        <h3 className="heading-tertiary u-margin-bottom-small">You're going to fall in love</h3>
                        <p className="paragraph">Sydney is a long way from Thailand, but when you pay us a visit at our restaurant in Mosman, we’re sure that you’ll feel like you’re right back in Bangkok.</p>
                        <h3 className="heading-tertiary u-margin-bottom-small">Come and enjoy all the favourites of Thai cuisine</h3>
                        <p className="paragraph">from starters like tom kha soup, satay skewers and spring rolls to curries red and green, pad thai, spicy crab and plenty more. Pay us a visit at our restaurant on Vista Street – just where Military Road and Spit Road meet.</p>
                        {/* <Link href='/menu'>
                          <a className="btn-text">See our meals &rarr;</a>
                        </Link> */}
            </Col>
            <Col sm={6} xs={12} className='my-4'>
                        <div className="composition">
                          {/* <img src="/thainine-tomyum.jpg" alt="Photo 1" className="composition__photo composition__photo--p1"/>
                          <img src="/thainine-fish.jpg" alt="Photo 2" className="composition__photo composition__photo--p2"/> */}
                          <img src="/thainine-banana-blossom.jpg" alt="Photo 3" className="composition__photo composition__photo--p3"/>
                        </div>
                        </Col>
          </Row>
    </section>
    </Container>
      <section className='section-contactus' name="section-contactus">
        <div className='u-center-text u-margin-bottom-small'>
          <h2 className='heading-secondary mx-4'>Contact us</h2>
        </div>
        <Row className='align-items-top'>
          <Col md={4} xs={12} className='section-contactus__box'>
            <div className='section-contactus__title'>address</div>
            <div className='section-contactus__details'>
            <a href='https://goo.gl/maps/wP2feHz9Juconcjq5'>Shop 8, 3 Vista st. Mosman, NSW 2088</a>
            </div>
          </Col>
          <Col md={4} xs={12} className='section-contactus__box'>
            <div className='section-contactus__title'>Phone + Email</div>
            <div className='section-contactus__details'>
            <a href="tel:0299607454">(02) 9960 7454</a>, <a href="tel:0299607453">(02)9960 7453</a> <a href='mailto:thaininemosman@gmail.com'>thaininemosman@gmail.com</a>
            </div>
          </Col>
          <Col md={4} xs={12} className='section-contactus__box'>
            <div className='section-contactus__title'>Opening hours</div>
            <div className='section-contactus__details'>
              <div>Tuesday – SUNDAY: 5.30pm – 9:30pm</div>
            </div>
          </Col>
        </Row>
      </section>
    </>
  )
}
