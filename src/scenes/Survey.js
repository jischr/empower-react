import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import { Cookies } from 'react-cookie'

import SideNav from '../components/SideNav'
import SurveyContent from '../components/SurveyContent'


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
          <SideNav />
          <SurveyContent />
        </div>
      )
    }
    else if (!+cookies.get('isUser')) {
      return <Redirect to={'/home'} />
    }
  }
}

export default Survey
