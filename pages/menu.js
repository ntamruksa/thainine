import React, { useState } from 'react'
import {
  Col,
  Container,
  Row,
  Spinner,
  Accordion,
  Button,
} from 'react-bootstrap'
import MenuItem from '../components/common/MenuItem'
import { CATEGORIES } from '../components/StaticData'
import moment from 'moment'
import api from '../services/API'

const Menu = ({ hideCart, setGlobalCart }) => {
  const timeFormat = 'hh:mm:ss'
  const todayDate = moment().format('DD-MM-yyyy')
  const { data: menuitems, isLoading, isError } = api.menuItemQuery()
  const { data: businessHours } = api.businessHours()
  const { data: dateConfig } = api.dateConfig(todayDate)
  const today = moment().format('dddd').toLowerCase()
  const openTime = moment('17:30:00', timeFormat)
  const shopOpen = !(
    businessHours?.isTodayClosed ||
    businessHours?.closedDays?.includes(today) ||
    moment().isBefore(openTime) ||
    dateConfig?.date === todayDate
  )

  return (
    <section className='section py-5 order-section'>
      <Container>
        <section className='section section-banner'>
          <div className='notification'>
            {businessHours?.isTodayClosed
              ? `Online order closed today`
              : businessHours?.closedDays?.includes(today)
              ? `Restaurant is closed today`
              : dateConfig?.date === todayDate
              ? `Restaurant is closed today`
              : moment().isBefore(openTime)
              ? `Opens at 5:30 pm`
              : ''}
          </div>
        </section>
        {isLoading ? (
          <>
            <Spinner animation='border' variant='primary' className='mr-2' />{' '}
            Loading menu...
          </>
        ) : (
          <>
            {CATEGORIES.map(({ title, category }) => (
              <Accordion defaultActiveKey={title}>
                <Row key={title}>
                  <Col md={12}>
                    <Accordion.Toggle
                      as={Button}
                      size='block'
                      variant='link'
                      className='text-left d-flex align-items-center p-0'
                      eventKey={title}>
                      <h3 className='my-3 text-capitalize'>
                        <strong>{title}</strong>
                      </h3>
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey={title} show>
                      <Row>
                        {menuitems &&
                          menuitems
                            .filter((item) => item.category === category)
                            .map((item) => (
                              <Col
                                key={item._id}
                                md={4}
                                sm={6}
                                xs={12}
                                className='d-flex flex-grow-1'>
                                <MenuItem
                                  key={item._id}
                                  item={item}
                                  hideCart={hideCart}
                                  setGlobalCart={setGlobalCart}
                                  shopOpen={shopOpen}
                                />
                              </Col>
                            ))}
                      </Row>
                    </Accordion.Collapse>
                  </Col>
                </Row>
              </Accordion>
            ))}
          </>
        )}
      </Container>
    </section>
  )
}

export default Menu
