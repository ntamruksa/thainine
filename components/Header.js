import Nav from './Nav'

const Header = () => (
  <div className='header'>
    {/* <div className='header__logo-box'>
      <img src='/Logo-Baiyok-med.png' alt='Logo' className='header__logo' />
    </div> */}
    {/* <div className='header__text-box'>
      <h1 className='heading-primary'>
        <span className='heading-primary--main'>Bai Yok</span>
        <span className='heading-primary--est'>Est. 2001</span>
        <span className='heading-primary--sub'>Modern Thai Cuisine</span>
      </h1>
    </div> */}
    <div className='header__menu'>
      <Nav />
    </div>
  </div>
)

export default Header
