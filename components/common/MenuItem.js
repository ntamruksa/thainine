import React, { useState } from 'react'
import { Badge, Button, Media, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
// import EditMenuItemModal from '../modals/EditMenuItemModal'
// import EditBurgerModal from '../modals/EditBurgerModal'
import MenuModal from '../modal/MenuModal'

const MenuItem = ({ item = null, hideCart, setGlobalCart, shopOpen }) => {
  // const [showEditMenu, setShowEditMenu] = useState(false)
  // const [showBurgerMenu, setShowBurgerMenu] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  // const hideEditMenu = () => {
  //   setShowEditMenu(false)
  // }
  // const hideBurgerMenu = () => {
  //   setShowBurgerMenu(false)
  // }
  const hideMenu = () => {
    setShowMenu(false)
  }

  const showMenuModal = () => {
    setShowMenu(true)
    hideCart()
  }

  return (
    <>
      {/* {showEditMenu && <EditMenuItemModal show={showEditMenu} onHide={hideEditMenu} item={item} />}
      {showBurgerMenu && <EditBurgerModal show={showBurgerMenu} onHide={hideBurgerMenu} item={item} />}*/}
      {showMenu && (
        <MenuModal
          show={showMenu}
          onHide={hideMenu}
          item={item}
          setGlobalCart={setGlobalCart}
          shopOpen={shopOpen}
        />
      )}
      <div
        className='p-3 bg-white rounded border shadow-sm m-2 flex-grow-1'
        onClick={() => showMenuModal()}>
        {/* todo don't use float-right... use flex insteead */}
        <Row>
          <Col sm={7} xs={8}>
            <Media>
              <Media.Body>
                <h4 className='mb-2 text-capitalize'>
                  <strong>{item.title}</strong>
                  {item.badges &&
                    item.badges.map((badge) => (
                      <Badge variant='info' className='ml-2 text-capitalize'>
                        {badge}
                      </Badge>
                    ))}
                </h4>
                <p className='text-gray mb-0'>
                  {item.subtitle &&
                    (item.subtitle.length > 90
                      ? `${item.subtitle.substring(0, 90)}..`
                      : item.subtitle)}
                </p>
                <p className='mb-0'>${(item.priceInCents / 100).toFixed(2)}</p>
                {!item.available && (
                  <Badge variant='danger' className='ml-2 text-capitalize'>
                    sold out
                  </Badge>
                )}
              </Media.Body>
            </Media>
          </Col>
          <Col>
            <div>
              {item.image && <img src={item.image} alt='Upload Preview' />}
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

MenuItem.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  imageAlt: PropTypes.string,
  image: PropTypes.string,
  imageClass: PropTypes.string,
  qty: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  getValue: PropTypes.func,
  available: PropTypes.bool,
}
MenuItem.defaultProps = {
  imageAlt: '',
  imageClass: '',
  showBadge: false,
  price: '',
  priceUnit: '$',
  showPromoted: false,
  badgeVariant: 'danger',
  available: true,
}

export default MenuItem
