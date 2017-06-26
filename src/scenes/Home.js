import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Cookies } from 'react-cookie'
import { instanceOf } from 'prop-types'

import HomeUser from '../components/HomeUser'
import HomeClinician from '../components/HomeClinician'

class Home extends Component {
  constructor() {
    super()

    this.state = {
      isLoggedIn: false,
      isUser: null
    }
  }
  componentWillMount() {
    let cookies = new Cookies()
    this.setState({
      isLoggedIn: cookies.get('isLoggedIn'),
      isUser: +cookies.get('isUser')
    })
  }
  render() {
    let cookies = new Cookies()
    if (!this.state.isLoggedIn) {
      cookies.remove()
      return <Redirect to={"/"}/>
    }
    else if (this.state.isUser) {
      return (
        <HomeUser />
      )
    }
    else if (!this.state.isUser) {
      return (
        <HomeClinician />
      )
    }
  }
}

export default Home
