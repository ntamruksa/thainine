import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import moment from 'moment'
import { getCart } from '../../services/cart'
import api from '../../services/API'
import formatMoney from '../../services/formatMoney'
import CartItem from './CartItem'
import CheckoutCart from '../checkout/CheckoutCart'

function useOutsideAlerter(ref, hideCart) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        hideCart()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

const Cart = ({ open, hideCart, setGlobalCart }) => {
  const timeFormat = 'hh:mm:ss'
  const todayDate = moment().format('DD-MM-yyyy')
  const { data: businessHours } = api.businessHours()
  const { data: dateConfig } = api.dateConfig(todayDate)
  const today = moment().format('dddd').toLowerCase()
  const openTime = moment(businessHours?.openTime, timeFormat)
  const closeTime = moment(businessHours?.closeTime, timeFormat)
  const shopOpen = !(
    businessHours?.isTodayClosed ||
    businessHours?.closedDays?.includes(today) ||
    moment().isBefore(openTime) ||
    moment().isAfter(closeTime) ||
    dateConfig?.date === todayDate
  )

  const [cart, setCart] = useState(getCart())

  const refreshCart = () => {
    console.log('refresh cart get called')
    setCart(getCart())
    setGlobalCart(getCart())
  }

  useEffect(() => {
    setCart(getCart())
  }, [open])

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, hideCart)

  return (
    <div className='cart' open={open} onHide={hideCart} ref={wrapperRef}>
      <header>
        <div className='close' onClick={hideCart}>
          &times;
        </div>
        <h1>Your order</h1>
      </header>
      <ul>
        {cart &&
          cart.items.map((cartItem, idx) => (
            <CartItem key={idx} cartItem={cartItem} refreshCart={refreshCart} />
          ))}
      </ul>
      <footer>
        <h2>{formatMoney(cart ? cart.cartTotal : 0)}</h2>
        <Link href='/checkout'>
          <button
            className='theme-btn'
            disabled={!shopOpen || (cart && cart.items.length === 0)}
            onClick={() => hideCart()}>
            Checkout
          </button>
        </Link>
      </footer>
    </div>
  )
}

export default Cart
