import React, { Component } from 'react'
import Footer from './Footer'
import Header from './Header'
import Meta from './Meta'
class Page extends Component {
  render() {
    return (
      <div>
        <Meta />
        <Header />
        <div style={{ marginTop: '60px' }}>{this.props.children}</div>
        <Footer />
      </div>
    )
  }
}

export default Page
