import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Cookies } from 'react-cookie'

import Charts from '../components/Charts.js'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import SideNavC from '../components/SideNavC.js'

class Home extends Component {
  render() {
    let cookies = new Cookies()
    if (!cookies.get('isLoggedIn') && +cookies.get('isUser')) {
      return <Redirect to={"/"}/>
    }
    else if (!+cookies.get('isUser')) {
      return (
        <div>
          <SideNavC />
          <Header />
          <Charts />
          <Footer />
        </div>
      )
    }
  }
}

export default Home
