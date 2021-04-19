import React from 'react'
import CashForm from './CashForm'

const CheckoutCartByCash = ({ cart, isValid, errorMessage }) => {
  return (
      <CashForm isValid={isValid} cart={cart} errorMessage={errorMessage}/>
  )
}

export default CheckoutCartByCash
