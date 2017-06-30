import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../assets/Landing.css'
import LoginForm from '../components/LoginForm'

class Landing extends Component {
  render() {
    return (
      <div className="background_image">
        <div className="container-fluid">
          <div className="container-fluid splash">
            <div className="splash-content">
              <h2 className="text-center splash-heading">Empower</h2>
              <h4 className="splash-tagline">clinician-led active platform for self management</h4>
              <div className="login text-center">
                <LoginForm/>
                <h5><Link to="/signup">Create Account</Link></h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing
