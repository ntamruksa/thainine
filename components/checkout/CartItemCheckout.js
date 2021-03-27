import React from "react";
import formatMoney from "../../services/formatMoney";
import styled from "styled-components";
const CartItemStyles = styled.li`
  padding: 1rem 0;
  /* border-bottom: 1px solid ${(props) => props.theme.lightgrey}; */
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

const CartItem = ({ cartItem }) => (
  <CartItemStyles>
    <img width="80" src={cartItem.item.image} />
    <div className="cart-item-details">
      <h3 className='text-left'>{cartItem.item.title}</h3>
      {cartItem.option && <p className='text-left'>{cartItem.option.title} {cartItem.option.priceInCents > 0 ? `(${formatMoney(cartItem.option.priceInCents)})` : ''}</p>}
      {cartItem.glutenFree && <p className='text-left'>
        Gluten Free ($1.00)
      </p>}
      <p className='text-left'>
        {formatMoney(cartItem.totalPrice * cartItem.quantity)}
        {" - "}
        <em>
          {cartItem.quantity} &times; {formatMoney(cartItem.totalPrice)}
        </em>

      </p>
      {cartItem.note && <p className='text-left'>
        Note: {cartItem.note}
      </p>}
    </div>
  </CartItemStyles>
);

export default CartItem;
