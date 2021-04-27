import React from 'react'
import { Form } from 'react-bootstrap'
import AddressForm from './AddressForm'
const CheckoutDeliveryDetail = ({
  handleInputChange,
  pickupName,
  email,
  phone,
  address,
}) => {
  return (
    <div>
      <h2 className='my-4'>
        Usually delivery time is 30 mins, However if any delay occur we will
        email you after confirm the order. Delivery started from 6pm.
      </h2>
      <p>
        ** Delivery fee is $3 and we are currently deliver to Mosman, Cremorne,
        and Cremorne Point **
      </p>
      <Form className='form'>
        <AddressForm onChange={handleInputChange} address={address} />
        <Form.Group controlId='formPickupName' className='u-margin-bottom-med'>
          <Form.Label>Name</Form.Label>
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

export default CheckoutDeliveryDetail
