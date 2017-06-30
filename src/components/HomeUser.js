import React, {Component} from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Grid,
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
          <Row className="home_row home-user-grid">
            <Col md={6} className="home-left">
              <div className="text-center">
                <h1>Empower</h1>
                <h3>putting you back in charge</h3>
                <hr></hr>
              </div>
              <div>
                <h2>What is an ALTERNATIVE?</h2>
                <p><span className="alt-content-heading">An alternative is a choice to follow a different thought or behavior pattern when we feel our minds going to that anxious place.</span><br/><br/>Our brains form neural pathways -- the more we exhibit a behavior or thought, the deeper and more traveled the path becomes. But, it doesn't always have to be this way. The brain's neuro-plasticity enables us to "rewire" these unhealthy neural pathways for healthier choice.<br/><br/>Need some inspiration? Take a walk. Drink a cup of tea. Talk to a friend.</p>
                <div className="take-survey-container">
                  <div className="text-center take-survey">
                    <h2><span className="check-in-light">CHECK-IN</span><span className="check-in-heading"> with yourself</span></h2>
                    <Link to="/survey"><Button>Take a Survey</Button></Link>
                  </div>
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
