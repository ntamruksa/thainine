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
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default Page
