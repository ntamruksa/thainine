import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import InfoMessageModal from '../modal/InfoMessageModal'
const ButtonStyles = styled.div`
  text-align: center;
  width: 100%;
  height: 7rem;
  margin-bottom: 2rem;
  cursor: pointer;
  :active {
    background-color: grey;
    color: white;
  }
`
const ButtonSubtitleStyle = styled.p`
  text-transform: none;
  font-style: italic;
  text-align: center;
  font-size: 1rem;
`

const OrderOptions = ({
  isPickup,
  isDelivery,
  selectPickup,
  selectDelivery,
  cart,
}) => {
  const [cannotDelivery, setCannotDelivery] = useState(false)
  const handleClose = () => setCannotDelivery(false)
  const handleShow = () => setCannotDelivery(true)
  const clickDelivery = () => {
    if (!cart || cart.cartSubTotal < 2500) {
      handleShow()
    } else {
      selectDelivery()
    }
  }

  return (
    <>
      <InfoMessageModal message={'Delivery minimum order is $25'} show={cannotDelivery} onHide={handleClose}/>
      <Row>
        <Col>
          <ButtonStyles
            className={`invert-theme-btn ${
              isPickup ? 'invert-theme-btn__selected' : ''
            }`}
            onClick={selectPickup}>
            Pickup
          </ButtonStyles>
        </Col>
        <Col>
          <ButtonStyles
            className={`invert-theme-btn ${
              isDelivery ? 'invert-theme-btn__selected' : ''
            }`}
            onClick={() => clickDelivery()}
            disabled={!cart || cart.cartSubTotal < 2500}>
            Delivery
            <ButtonSubtitleStyle>minimun order $25</ButtonSubtitleStyle>
          </ButtonStyles>
        </Col>
      </Row>
    </>
  )
}

export default OrderOptions
