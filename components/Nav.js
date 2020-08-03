import Link from 'next/link'

const Nav = () => (
  <div className='row'>
    <div className='col-1-of-3'>
      <Link href='/'>
        <a className='btn btn--transparent btn--animated'>Home</a>
      </Link>
    </div>
    {/* <div className='col-1-of-3'>
      <Link href='/menu'>
        <a className='btn btn--transparent btn--animated'>Menu</a>
      </Link>
    </div>
    <div className='col-1-of-3'>
      <Link href='/menu'>
        <a className='btn btn--transparent btn--animated'>Contact</a>
      </Link>
    </div> */}
  </div>
)

export default Nav
