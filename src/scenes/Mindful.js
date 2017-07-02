import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import {
  Row,
  Col,
} from 'react-bootstrap'

import SideNavUser from '../components/SideNavUser'
import Header from '../components/Header'
import '../assets/mindful.css'

class Mindful extends Component {
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
          <Row className="mindful">
            <Col xs={12} sm={6} className="mindful-about">
                <h1>MINDFULNESS</h1>
            </Col>
            <Col xs={12} sm={6} className="mindful-soundcloud">
              <br/><br/>
              <div>
                <iframe title="sc-widget2" width="75%" height="100" scrolling="no" frameBorder="no" src="https://w.soundcloud.com/player/?url=https://soundcloud.com/mindfulmagazine/6-minute-mountain-meditation-to-help-you-shift-out-of-panic-mode"></iframe>
              </div>
              <br/><br/>
              <div>
                <iframe title="sc-widget3" width="75%" height="100" scrolling="no" frameBorder="no" src="https://w.soundcloud.com/player/?url=https://soundcloud.com/mindfulmagazine/7-minute-mindfulness-practice-for-responding-to-stress"></iframe>
              </div>
              <br/><br/>
              <div>
                <iframe title="sc-widget4" width="75%" height="100" scrolling="no" frameBorder="no" src="https://w.soundcloud.com/player/?url=https://soundcloud.com/mindfulmagazine/a-meditation-to-recharge-your-mind"></iframe>
              </div>
              <br/><br/>
              <div>
                <iframe title="sc-widget5" width="75%" height="100" scrolling="no" frameBorder="no" src="https://w.soundcloud.com/player/?url=https://soundcloud.com/mindfulmagazine/3-minute-body-scan-meditation"></iframe>
              </div>
            </Col>
          </Row>
        </div>
      )
    }
    else if (!+cookies.get('isUser')) {
      return <Redirect to={'/home'} />
    }
  }
}


export default Mindful
