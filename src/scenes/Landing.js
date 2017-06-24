import React, { Component } from 'react'
import '../assets/Landing.css'
import LoginForm from '../components/LoginForm'

class Landing extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="container-fluid splash">
          <div className="splash-content">
            <h2 className="text-center splash-heading">EmpowerU</h2>
            <h4 className="splash-tagline">clinician-led active platform for self management</h4>
            <div className="login text-center">
              <LoginForm/>
              <h5>Create Account</h5>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing
