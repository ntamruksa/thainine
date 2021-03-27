import React from 'react'
import { updateItemQtyInCart } from '../../services/cart'

const addQuantity = (cartItem, refreshCart) => {
  updateItemQtyInCart(cartItem, cartItem.quantity + 1)
  refreshCart()
}

const removeQuantity = (cartItem, refreshCart) => {
  if (cartItem.quantity > 1) {
    updateItemQtyInCart(cartItem, cartItem.quantity - 1)
    refreshCart()
  }
}

const QuantityUpdate = ({ cartItem, refreshCart }) => (
  <div className='qty-btn'>
    <button
      className='round-btn__small ml-4'
      disabled={cartItem.quantity <= 1}
      onClick={() => removeQuantity(cartItem, refreshCart)}>
      &minus;
    </button>
    <div className='mb-0 mt-2 p-4'>{cartItem.quantity}</div>
    <button
      className='round-btn__small mr-4'
      onClick={() => addQuantity(cartItem, refreshCart)}>
      &#43;
    </button>
  </div>
)

export default QuantityUpdate
