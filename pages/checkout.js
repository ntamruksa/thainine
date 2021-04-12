import { Container } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import CheckoutCart from '../components/checkout/CheckoutCart'
import { getCart } from '../services/cart'
import api from '../services/API'
import CheckoutOrderDetail from '../components/checkout/CheckoutOrderDetail'
import CheckoutPickupDetail from '../components/checkout/CheckoutPickupDetail'
import CheckoutDeliveryDetail from '../components/checkout/CheckoutDeliveryDetail'
import OrderOptions from '../components/checkout/OrderOptions'
export default function Checkout() {
  // check if shop is open first for checkout
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
  const [errorMessage, setErrorMessage] = useState(null)
  const [isPickup, setIsPickup] = useState(true)
  const [isDelivery, setIsDelivery] = useState(false)
  const [email, setEmail] = useState('')
  const [pickupName, setPickupName] = useState('')
  const [phone, setPhone] = useState('')
  const [blockedTimeList, setBlockedTimeList] = useState({ blockedTime: [] })
  const [time, setTime] = useState(null)
  const [address, setAddress] = useState('')
  const [deliveryFeeInCentsConst] = useState(300)
  const selectPickup = () => {
    setIsPickup(true)
    setIsDelivery(false)
    if (
      cart.deliveryFeeInCents &&
      cart.deliveryFeeInCents === deliveryFeeInCentsConst
    ) {
      setCart({
        ...cart,
        deliveryFeeInCents: 0,
        cartTotal: cart.cartTotal - cart.deliveryFeeInCents,
        cartSubTotal: cart.cartTotal - cart.deliveryFeeInCents,
      })
    } else {
      setCart({ ...cart, deliveryFeeInCents: 0 })
    }
  }
  const selectDelivery = () => {
    setIsPickup(false)
    setIsDelivery(true)
    if (!cart.deliveryFeeInCents || cart.deliveryFeeInCents === 0) {
      setCart({
        ...cart,
        deliveryFeeInCents: deliveryFeeInCentsConst,
        cartTotal: cart.cartTotal + deliveryFeeInCentsConst,
        cartSubTotal: cart.cartTotal + deliveryFeeInCentsConst,
      })
    } else {
      setCart({ ...cart, deliveryFeeInCents: deliveryFeeInCentsConst })
    }
  }
  const availableTime = Number(
    moment().add(20, 'minutes').hours().toString() +
      moment().add(20, 'minutes').minutes().toString().padStart(2, "0")
  )
  const timeList = [
    { id: 600, label: '6:00 pm', value: 1800 },
    { id: 615, label: '6:15 pm', value: 1815 },
    { id: 630, label: '6:30 pm', value: 1830 },
    { id: 645, label: '6:45 pm', value: 1845 },
    { id: 700, label: '7:00 pm', value: 1900 },
    { id: 715, label: '7:15 pm', value: 1915 },
    { id: 730, label: '7:30 pm', value: 1930 },
    { id: 745, label: '7:45 pm', value: 1945 },
    { id: 800, label: '8:00 pm', value: 2000 },
    { id: 815, label: '8:15 pm', value: 2015 },
    { id: 830, label: '8:30 pm', value: 2030 },
    { id: 845, label: '8:45 pm', value: 2045 },
    { id: 900, label: '9:00 pm', value: 2100 },
    { id: 915, label: '9:15 pm', value: 2115 },
    { id: 930, label: '9:30 pm', value: 2130 },
  ]
  const [isValid, setIsValid] = useState(null)
  useEffect(() => {
    const validPhoneNumber = (n) =>
      n.toString().length === 10 && n.toString().substring(0, 2) === '04'
    if (isPickup && time === null) {
      setIsValid(false)
      setErrorMessage('Please select Pickup Time')
    } else if (isDelivery && !address) {
      setIsValid(false)
      setErrorMessage('Delivery address is required')
    } else if (!pickupName) {
      setIsValid(false)
      setErrorMessage(isPickup ? 'Pickup Name is required' : 'Name is required')
    } else if (!email) {
      setIsValid(false)
      setErrorMessage('Email is required')
    } else if (!phone || !validPhoneNumber(phone)) {
      setIsValid(false)
      setErrorMessage('Valid Phone Number is Required')
    } else {
      setIsValid(true)
      setErrorMessage('')
    }
  }, [phone, email, time, pickupName, address, isPickup, isDelivery])
  const handleInputChange = (e) => {
    const value = e.target.value
    if (e.target.id === 'formBasicEmail') {
      setCart({ ...cart, email: value })
      setEmail(value)
    } else if (e.target.id === 'formPickupName') {
      setCart({ ...cart, pickupName: value })
      setPickupName(value)
    } else if (e.target.id === 'formPhone') {
      setCart({ ...cart, phone: value })
      setPhone(value)
    } else if (e.target.id === 'address_full') {
      setCart({
        ...cart,
        address: e.fullAddress,
        option: 'delivery',
        pickupTime: undefined,
      })
      setAddress(e.fullAddress)
    }
  }

  const handleTimeChange = (e) => {
    setTime(e.target.value)
    setCart({
      ...cart,
      pickupTime: e.target.value,
      option: 'pickup',
      address: undefined,
    })
  }

  return (
    <Container>
      <section className='section-covid'>
        {shopOpen ? (
          <>
            <div className='u-center-text'>
              <h2 className='heading-secondary '>Checkout</h2>
            </div>
            <div className='section-covid__form form-container'>
              <OrderOptions
                isPickup={isPickup}
                isDelivery={isDelivery}
                selectPickup={selectPickup}
                selectDelivery={selectDelivery}
                cart={cart}
              />
              {isPickup && (
                <CheckoutPickupDetail
                  handleInputChange={handleInputChange}
                  handleTimeChange={handleTimeChange}
                  pickupName={pickupName}
                  timeList={timeList}
                  blockedTimeList={blockedTimeList}
                  availableTime={availableTime}
                  email={email}
                  phone={phone}
                />
              )}
              {isDelivery && (
                <CheckoutDeliveryDetail
                  handleInputChange={handleInputChange}
                  handleTimeChange={handleTimeChange}
                  pickupName={pickupName}
                  email={email}
                  phone={phone}
                  address={address}
                />
              )}
              <CheckoutOrderDetail cart={cart} />
              <CheckoutCart
                cart={cart}
                isValid={isValid}
                errorMessage={errorMessage}
              />
            </div>
          </>
        ) : (
          <div className='u-center-text'>
            <h2 className='heading-secondary '>{`Sorry, Online order is temporary unavailable`}</h2>
          </div>
        )}
      </section>
    </Container>
  )
}
