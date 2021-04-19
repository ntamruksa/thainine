import React, { useState, useEffect } from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'
import api from '../../services/API'
import { useRouter } from 'next/router'

export default function CardForm({ isValid, cart, errorMessage }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState(errorMessage)
  useEffect(() => {
    setCheckoutError(errorMessage)
  }, [errorMessage])
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()
    setLoading(true)
    cart.paymentMethodId = 'cash'
    const response = await api.addOrder(cart)
    console.log('response', response)
    router.push({
      pathname: `/checkout-success`,
      query: { orderId: response.orderId },
    })
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
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
            disabled={!isValid || loading}>
            {loading && (
              <>
                <Spinner as='span' animation='border' aria-hidden='true' />
                <>&nbsp;&nbsp;</>
              </>
            )}
            Submit{loading ? 'ing' : ''} Order
          </button>
        </Col>
      </Row>
    </form>
  )
}
