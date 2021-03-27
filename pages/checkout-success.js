import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import api from '../services/API'
import formatMoney from '../services/formatMoney'
import CartItemCheckout from '../components/checkout/CartItemCheckout'
import { clearCart, getCart } from '../services/cart'
import moment from 'moment'

const CheckoutSuccess = ({ orderId, refreshCart, setGlobalCart }) => {
  const [order, setOrder] = useState({})
  const [adjustItem, setAdjustItem] = useState(undefined)

  useEffect(() => {
    async function fetchData() {
      clearCart()
      setGlobalCart(getCart())
      const response = orderId ? await api.getOrder(orderId) : undefined
      setOrder(response)
      if (response.adjustInCents) {
        const item = {
          quantity: 1,
          item: {
            title: response.adjustNote,
          },
          totalPrice: response.adjustInCents,
        }
        setAdjustItem(item)
      }
    }
    fetchData()
  }, [])

  return (
    <Container>
      <section className='section-thankyou'>
        {order ? (
          <div className='u-center-text u-margin-bottom-big'>
            <h2 className='heading-secondary u-margin-bottom-small'>
              Checkout Success
            </h2>
            <p className='paragraph-main px-4 mb-0'>{`Your order number is: #${order.orderNumber}`}</p>
            {order.status === 'open' && (
              <>
                <p className='px-4 mb-2'>{`Your credit card will not be charged until we confirmed your order.`}</p>
                <p className='px-4 mb-2'>{`Please wait for confirmation email regarding exact pickup time and total amount.`}</p>
              </>
            )}
            {order.status !== 'open' && (
              <>
                <Row>
                  <Col className='text-right px-0'>Placed On:</Col>
                  <Col className='text-left'>{`${moment(
                    order.createdDate
                  ).format('ddd DD-MMM-YYYY HH:mm')}`}</Col>
                </Row>
                <Row>
                  <Col className='text-right px-0'>Name:</Col>
                  <Col className='text-left'>{`${order.pickupName}`}</Col>
                </Row>
                {order.option === 'pickup' && (
                  <Row>
                    <Col className='text-right px-0'>Pickup Time:</Col>
                    <Col className='text-left'>
                      {order.pickupTime}{' '}
                      {order.delayMins
                        ? `(+ Delay ${order.delayMins} mins)`
                        : ''}
                    </Col>
                  </Row>
                )}
                {order.option === 'delivery' && (
                  <>
                    <Row>
                      <Col className='text-right px-0'>Delivery Time:</Col>
                      <Col className='text-left'>
                        {moment(order.deliveryTime).format('hh:mm a')}{' '}
                        {order.delayMins
                          ? `(+ Delay ${order.delayMins} mins)`
                          : ''}
                      </Col>
                    </Row>
                    <Row>
                      <Col className='text-right px-0'>Delivery Address:</Col>
                      <Col className='text-left'>{order.address}</Col>
                    </Row>
                  </>
                )}
                <Row>
                  <Col className='text-right px-0'>Contact number:</Col>
                  <Col className='text-left'>{`${order.phone}`}</Col>
                </Row>
                <Row>
                  <Col className='text-right px-0'>Order Status:</Col>
                  <Col className='text-left'>{`${order.status}`}</Col>
                </Row>
                <Row className='justify-content-center cart-checkout-success'>
                  <header></header>
                </Row>
                {order &&
                  order.items &&
                  order.items.map((cartItem, idx) => (
                    <Row
                      className='justify-content-start checkout-success-item'
                      key={idx}>
                      <CartItemCheckout
                        key={idx}
                        cartItem={cartItem}
                        refreshCart={refreshCart}
                      />
                    </Row>
                  ))}
                {adjustItem && (
                  <Row className='justify-content-start checkout-success-item'>
                    <CartItemCheckout
                      cartItem={adjustItem}
                      refreshCart={refreshCart}
                    />
                  </Row>
                )}
                {order.option === 'delivery' && (
                  <Row className='justify-content-start checkout-success-item'>
                    <CartItemCheckout
                      cartItem={{
                        quantity: 1,
                        totalPrice: order.deliveryFeeInCents,
                        item: { image: '', title: 'Delivery Fee' },
                      }}
                    />
                  </Row>
                )}
                <Row className='justify-content-center cart-checkout-success'>
                  <footer>
                    <Col className='text-right px-0'>Total (inc.GST) :</Col>
                    <Col className='text-left'>{`${formatMoney(
                      order.totalInCents
                    )}`}</Col>
                  </footer>
                </Row>
              </>
            )}
          </div>
        ) : (
          <div className='u-center-text'>
            <h2 className='heading-secondary u-margin-bottom-small'>
              Sorry, We couldn't find your order
            </h2>
          </div>
        )}
      </section>
    </Container>
  )
}

export default CheckoutSuccess
CheckoutSuccess.getInitialProps = async ({ query }) => {
  const { orderId } = query

  return { orderId }
}
