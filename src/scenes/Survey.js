import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import { Cookies } from 'react-cookie'

import Header from '../components/Header'
import SurveyContent from '../components/SurveyContent'
import SideNavUser from '../components/SideNavUser'

class Survey extends Component {
  render() {
    let cookies = new Cookies()
    if (!cookies.get('isLoggedIn')) {
      return <Redirect to={'/'}/>
    }
    else if (+cookies.get('isUser')) {
      return (
        <div>
          <Header />
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
