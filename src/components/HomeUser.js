import React, {Component} from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Jumbotron,
Grid,
Row,
Col } from 'react-bootstrap'

import SideNavUser from './SideNavUser'
import Alternatives from './Alternatives'
import Header from './Header'
import '../assets/homeUser.css'

class HomeUser extends Component {
  render() {
    return (
      <div>
        <SideNavUser />
        <Header />
        <div>
          <Row>
            <Col md={6} className="home-left">
              <div className="text-center">
                <h1>EmpowerU</h1>
                <h3>putting you back in charge</h3>
                <hr></hr>
              </div>
              <div>
                <h2>What is an ALTERNATIVE?</h2>
                <p>An alternative is an </p>
                <h2>Why SURVEYS?</h2>
                <div className="text-center">
                  <Link to="/survey"><Button>Take a Survey</Button></Link>
                </div>
              </div>
            </Col>
            <Col md={6} className="home-right">
                  <Alternatives />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default HomeUser
