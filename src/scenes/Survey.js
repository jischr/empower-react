import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import { Cookies } from 'react-cookie'

import Header from '../components/Header'
import BDI from '../components/BDI'


class Survey extends Component {
  render() {
    let cookies = new Cookies()
    if (!cookies.get('isLoggedIn')) {
      cookies.remove()
      return <Redirect to={'/'}/>
    }
    else if (+cookies.get('isUser')) {
      return (
        <div>
          <Header />
          <BDI />
        </div>
      )
    }
    else if (!+cookies.get('isUser')) {
      return <Redirect to={'/home'} />
    }
  }
}

export default Survey
