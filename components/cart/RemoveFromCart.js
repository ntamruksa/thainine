import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../common/FontAwesome'
import { removeItemFromCart } from '../../services/cart'

const RemoveFromCart = ({ cartItem, refreshCart }) => (
  <Icon
    width='15'
    icon='trash'
    className='float-right icon--trash'
    size='lg'
    onClick={() => {
      removeItemFromCart(cartItem)
      refreshCart()
    }}
  />
)

export default RemoveFromCart
