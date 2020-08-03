import Link from 'next/link'

const Nav = () => (
  <div className="">
    <div className="bar">
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/menu">
        <a>Menu</a>
      </Link>
    </div>
  </div>
)

export default Nav;