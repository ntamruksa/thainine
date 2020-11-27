import React, {useState} from 'react'
import { Form, Modal, Row, Col } from 'react-bootstrap'

const MenuModal = ({ show, onHide, item }) => {
  const [itemTotalPriceInCents, setItemTotalPriceInCents] = useState(item.priceInCents)

  const selectOption = (e) => {
    const basePrice = item.priceInCents
    const optionPrice = item.options[e].priceInCents | 0
    setItemTotalPriceInCents(basePrice + optionPrice)
  }

  return (
    <Modal show={show} onHide={onHide} size='lg' centered >
      <Modal.Header closeButton={true}>
      </Modal.Header>
      <div>{item.image && <img src={item.image} alt='Menu Preview' className='menu-photo'/>}</div>
      <Modal.Body>
        <Form>
          <h1 className='text-capitalize p-4 menu-modal-title'>
          {item.title}
          </h1>
          <p className='text-gray mb-0 p-4 menu-modal-subtitle'>
            {item.subtitle &&
              (item.subtitle.charAt(item.subtitle.length - 1) === '.'
                ? item.subtitle.substring(0, item.subtitle.length - 1)
                : item.subtitle)}
          </p>
          {item.options && <>
            <div className="menu-modal-option-header">
              <div className="menu-modal-option-header-title">
              Choice of Preparation
                </div>
                <div className="menu-modal-option-header-subtitle">
              Choose One
                </div>
            </div>
            <div className="menu-modal-option-body">
            {item.options.map((option, index) => (
              <Row className="py-2" key={index}>
                <Col className="menu-modal-option-body-title col-auto">
                  <Form.Check
                    type="radio"
                    label={option.title}
                    name="menuOption"
                    key={index}
                    id={`menuOption-${index}`}
                    className="menu-modal-option-body-title-inner"
                    onClick={() => selectOption(index)}
                  />
                </Col>
                <Col className="menu-modal-option-body-price">
                  +${(option.priceInCents / 100).toFixed(2)}
                </Col>
              </Row>
            ))}
          </div>
          </>}
          <div className="menu-modal-price mb-0 p-4">
          ${(itemTotalPriceInCents / 100).toFixed(2)}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
export default MenuModal
