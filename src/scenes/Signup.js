import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../assets/Landing.css'
import SignupForm from '../components/SignupForm'

class Landing extends Component {
  render() {
    return (
      <div className="background_image">
        <div className="container-fluid">
          <div className="container-fluid splash">
            <div className="splash-content">
              <h2 className="text-center splash-heading">Empower</h2>
              <h4 className="splash-tagline">clinician-led active platform for self management</h4>
              <div className="login">
                <SignupForm/>
                <h5><Link to="/">Back to Login</Link></h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing
