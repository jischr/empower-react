import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../assets/Landing.css'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'


class Landing extends Component {
  render() {
    return (
      <div>
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
      </div>
    )
  }
}

export default Landing
