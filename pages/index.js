import Head from 'next/head'
import Link from 'next/link'
// import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <section className='section-aboutus'>
      <div className='u-center-text u-margin-bottom-big'>
        <h2 className='heading-secondary'>Welcome to Thai Nine</h2>
      </div>
      <div className="row">
                    <div className="col-1-of-2">
                        <h3 className="heading-tertiary u-margin-bottom-small">You're going to fall in love</h3>
                        <p className="paragraph">Sydney is a long way from Thailand, but when you pay us a visit at our restaurant in Mosman, we’re sure that you’ll feel like you’re right back in Bangkok.</p>
                        <h3 className="heading-tertiary u-margin-bottom-small">Come and enjoy all the favourites of Thai cuisine</h3>
                        <p className="paragraph">from starters like tom kha soup, satay skewers and spring rolls to curries red and green, pad thai, spicy crab and plenty more. Pay us a visit at our restaurant on Vista Street – just where Military Road and Spit Road meet.</p>
                        {/* <Link href='/menu'>
                          <a className="btn-text">See our meals &rarr;</a>
                        </Link> */}
                    </div>
                    <div className="col-1-of-2">
                        <div className="composition">
                          {/* <img src="/thainine-tomyum.jpg" alt="Photo 1" className="composition__photo composition__photo--p1"/>
                          <img src="/thainine-fish.jpg" alt="Photo 2" className="composition__photo composition__photo--p2"/> */}
                          <img src="/thainine-banana-blossom.jpg" alt="Photo 3" className="composition__photo composition__photo--p3"/>
                        </div>
                    </div>
      </div>
    </section>
  )
}
