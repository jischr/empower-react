import React, {Component} from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Row,
         Col } from 'react-bootstrap'
import { Cookies } from 'react-cookie'

import Alternatives from './Alternatives'
import Header from './Header'

import '../assets/homeUser.css'

class HomeUser extends Component {
  contructor() {
    this.state = {
      name: ''
    }
  }

  componentWillMount() {
    let cookie = new Cookies()
    this.setState({ name: cookie.get('name') })
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <Row className="home_row home-user-grid row_height">
            <Col md={6} className="home-left">
              <div className="text-center">
                <h1>WELCOME</h1>
                <h3>{this.state.name}</h3>
                <hr></hr>
              </div>
              <div className="take-survey-container">
                <div className="text-center take-survey">
                  <h2><span className="check-in-light">CHECK-IN</span><span className="check-in-heading"> with yourself</span></h2>
                  <Link to="/survey"><Button>Take a Survey</Button></Link>
                </div>
              </div>
            </Col>
            <Col md={6} className="home-right text-center">
              <h1>ALTERNATIVES</h1>
              <h2>/ noun  al·ter·na·tives/</h2>
              <p className="alt-content"><span className="alt-content-heading">A choice to follow a different thought or behavior pattern when we feel our minds going to that anxious place.</span><br /><br />Need inspiration? Drink a cup of tea. Talk to a friend.</p>
              <Alternatives />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default HomeUser
