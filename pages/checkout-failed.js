import Link from 'next/link'
import { Container } from 'react-bootstrap'

// import styles from '../styles/Home.module.css'

export default function CheckoutFailed() {
  return (
    <Container>
      <div className='u-center-text u-margin-bottom-big'>
        <h2 className='heading-secondary u-margin-bottom-small'>
          Checkout Failed
        </h2>
      </div>
    </Container>
  )
}
