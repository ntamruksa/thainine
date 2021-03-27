import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js';
import CardForm from './CardForm'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
const CheckoutCart = ({ cart, isValid, errorMessage }) => {
  return (
    <Elements stripe={stripePromise}>
      <CardForm isValid={isValid} cart={cart} errorMessage={errorMessage}/>
    </Elements>
  )
}

export default CheckoutCart
