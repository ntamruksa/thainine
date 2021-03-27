import React from 'react'
import { Form, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'

const CheckoutPickupDetail = ({
  handleInputChange,
  pickupName,
  email,
  phone,
  timeList,
  blockedTimeList,
  availableTime,
  handleTimeChange,
}) => {
  return (
    <div>
      <p>** Order to be picked up at Shop2A, 122 Edinburgh Rd. Castlecrag, NSW 2068 **</p>
      <Form className='form'>
        <Form.Group>
          <Form.Label>Pickup Time</Form.Label>
          <ToggleButtonGroup size='lg' className='m-2 flex-wrap' name='time'>
            {timeList.map((t) => {
              if (
                blockedTimeList.blockedTime &&
                blockedTimeList.blockedTime.includes(t.id)
              ) {
                return (
                  <ToggleButton
                    name='time'
                    variant='outline-dark'
                    className='btn m-2 flex-grow-0'
                    disabled
                    value={t.label}
                    key={t.label}>
                    {t.label}
                  </ToggleButton>
                )
              } else if (t.value < availableTime) {
                return (
                  <ToggleButton
                    name='time'
                    variant='outline-dark'
                    className='btn m-2 flex-grow-0'
                    disabled
                    value={t.label}
                    key={t.label}>
                    {t.label}
                  </ToggleButton>
                )
              } else {
                return (
                  <ToggleButton
                    name='time'
                    variant='outline-success'
                    className='btn m-2 flex-grow-0'
                    onClick={handleTimeChange}
                    value={t.label}
                    key={t.label}>
                    {t.label}
                  </ToggleButton>
                )
              }
            })}
          </ToggleButtonGroup>
        </Form.Group>
        <Form.Group controlId='formPickupName' className='u-margin-bottom-med'>
          <Form.Label>Pickup Name</Form.Label>
          <Form.Control
            className='paragraph-secondary'
            type='text'
            onChange={handleInputChange}
            value={pickupName}
          />
        </Form.Group>
        <Form.Group controlId='formBasicEmail' className='u-margin-bottom-med'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className='paragraph-secondary'
            type='email'
            onChange={handleInputChange}
            value={email}
          />
        </Form.Group>
        <Form.Group controlId='formPhone' className='u-margin-bottom-med'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            className='paragraph-secondary'
            type='number'
            onChange={handleInputChange}
            value={phone}
          />
        </Form.Group>
      </Form>
    </div>
  )
}

export default CheckoutPickupDetail
