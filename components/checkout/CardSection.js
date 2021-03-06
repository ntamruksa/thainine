/**
 * Use the CSS tab above to style your Element's container.
 */
import React from 'react'
import { CardElement } from '@stripe/react-stripe-js'
import {
  Form,
} from 'react-bootstrap'
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
    hidePostalCode: true,
  },
}

function CardSection() {
  return (
    <Form.Group controlId='formPhone' className='u-margin-bottom-med'>
      <Form.Label>Credit Card Details</Form.Label>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </Form.Group>
  )
}

export default CardSection
