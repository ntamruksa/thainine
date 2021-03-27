import React from "react";
import formatMoney from "../../services/formatMoney";
import styled from "styled-components";
import RemoveFromCart from './RemoveFromCart'
import QuantityUpdate from './QuantityUpdate'
const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.lightgrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto auto;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ cartItem, refreshCart }) => (
  <CartItemStyles>
    <img width="80" src={cartItem.item.image} alt={cartItem.item.title} />
    <div className="cart-item-details">
      <h3>{cartItem.item.title}</h3>
      {cartItem.option && <p>{cartItem.option.title} {cartItem.option.priceInCents > 0 ? `(${formatMoney(cartItem.option.priceInCents)})` : ''}</p>}
      {cartItem.glutenFree && <p>
        Gluten Free ($1.00)
      </p>}
      <p>
        {formatMoney(cartItem.totalPrice * cartItem.quantity)}
        {" - "}
        <em>
          {cartItem.quantity} &times; {formatMoney(cartItem.totalPrice)}
        </em>

      </p>
      {cartItem.note && <p>
        Note: {cartItem.note}
      </p>}
    </div>
    <QuantityUpdate cartItem={cartItem} refreshCart={refreshCart}/>
    <RemoveFromCart cartItem={cartItem} refreshCart={refreshCart}/>
  </CartItemStyles>
);

export default CartItem;
