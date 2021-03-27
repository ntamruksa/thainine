import React from 'react'
import { Form } from 'react-bootstrap'
import formatMoney from '../../services/formatMoney'
import CartItemCheckout from './CartItemCheckout'

const CheckoutOrderDetail = ({ cart }) => {
  return (
    <Form className='form'>
      <div className='cart-checkout'>
        <header>
          <h2>Your order</h2>
        </header>
        <ul>
          {cart &&
            cart.items.map((cartItem, idx) => (
              <CartItemCheckout key={idx} cartItem={cartItem} />
            ))}
            {cart && cart.deliveryFeeInCents > 0 && <CartItemCheckout cartItem={{quantity: 1, totalPrice: cart.deliveryFeeInCents, item: {image: '', title: 'Delivery Fee'}}} />}
        </ul>
        <footer>
          <h2>TOTAL (inc.GST) {cart && formatMoney(cart.cartSubTotal)}</h2>
        </footer>
      </div>
    </Form>
  )
}

export default CheckoutOrderDetail
