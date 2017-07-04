import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../assets/Landing.css'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'


class Landing extends Component {
  render() {
    return (
      <div className="background_image">
          <div className="container-fluid splash">
            <div className="splash-content">
              <h2 className="text-center splash-heading">Empower</h2>
              <h4 className="splash-tagline">an anxiety self-management platform</h4>

              {window.location.pathname === '/' &&
                <div className="login text-center">
                  <LoginForm/>
                  <h5><Link to="/signup">Create Account</Link></h5>
                </div>
              }
              {window.location.pathname === '/signup' &&
                <div className="login">
                  <SignupForm/>
                  <h5><Link to="/">Back to Login</Link></h5>
                </div>
              }
              <Link to="/about">TO ABOUT</Link>
            </div>
          </div>
      </div>
    )
  }
}

export default Landing
