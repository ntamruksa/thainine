import React from 'react'
import {Modal, Button} from 'react-bootstrap'

const InfoMessageModal = ({ message, show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>info</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h2>{message}</h2>
      </Modal.Body>

      <Modal.Footer>
        <Button className='theme-btn' onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default InfoMessageModal
