import React, { useState, useEffect } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { Row, Col, Spinner } from 'react-bootstrap'

import CardSection from './CardSection'
import api from '../../services/API'
import { useRouter } from 'next/router'

export default function CardForm({ isValid, cart, errorMessage }) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [loading, setLoading]= useState(false)
  const [checkoutError, setCheckoutError] = useState(errorMessage)
  useEffect(() => {
    setCheckoutError(errorMessage)
  }, [errorMessage])
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()
    setLoading(true)
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        // Include any additional collected billing details.
        name: cart.pickupName,
        email: cart.email
      }
    })
    if (result.error) {
      setCheckoutError(result.error.message)
      console.log('error', result.error.message)
      setLoading(false)
    } else {
      cart.paymentMethodId = result.paymentMethod.id
      const response = await api.addOrder(cart)
      console.log('response', response)
      router.push({
        pathname: `/checkout-success`,
        query: { orderId: response.orderId }
      })
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col className='mt-4'>
          <CardSection />
        </Col>
      </Row>
      {checkoutError && (
              <div className='mt-4 alert alert-danger' role='alert'>
                {checkoutError}
              </div>
            )}
      <Row>
        <Col>
          <button
            type='submit'
            className='theme-btn mt-4'
            disabled={!stripe || !isValid || loading}>
              {loading && (
                      <><Spinner
                        as='span'
                        animation='border'
                        aria-hidden='true'
                      /><>&nbsp;&nbsp;</></>
                    )}
            Submit{loading?'ing':''} Order
          </button>
        </Col>
      </Row>
    </form>
  )
}
