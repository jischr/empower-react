import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import { Jumbotron } from 'react-bootstrap'

import Header from '../components/Header'
import SurveyContent from '../components/SurveyContent'
import SideNavUser from '../components/SideNavUser'

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
          <SideNavUser />
          <Header />
          <div className="container">
            <Jumbotron className="alternatives">
              <SurveyContent />
            </Jumbotron>
          </div>

        </div>
      )
    }
    else if (!+cookies.get('isUser')) {
      return <Redirect to={'/home'} />
    }
  }
}

export default Survey
