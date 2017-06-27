import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Cookies } from 'react-cookie'
import { instanceOf } from 'prop-types'

import HomeUser from '../components/HomeUser'
import HomeClinician from '../components/HomeClinician'

class Home extends Component {
  render() {
    let cookies = new Cookies()
    if (!cookies.get('isLoggedIn')) {
      cookies.remove()
      return <Redirect to={"/"}/>
    }
    else if (+cookies.get('isUser')) {
      return (
        <HomeUser />
      )
    }
    else if (!+cookies.get('isUser')) {
      return (
        <HomeClinician />
      )
    }
  }
}

export default Home
