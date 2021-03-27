import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const CartCount = ({ count }) => {
  if (count === 0) return <></>
  return (
  <div className='cart-count-animation'>
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        className="count"
        classNames="count"
        key={count}
        timeout={{ enter: 500, exit: 500 }}
      >
        <div>{count}</div>
      </CSSTransition>
    </TransitionGroup>
  </div>
  )
}

export default CartCount
