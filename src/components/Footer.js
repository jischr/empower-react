import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import '../assets/homeUser.css'
import Sun from '../assets/images/sun2.svg'

class Footer extends Component {
  render() {
    return (
      <div>
        <div className="footer">
          <div className="container-fluid login-footer text-center">
            <Link className="footer-link" to="https://github.com/jenniferwiner/empower-api" target="blank" className="text-center"><img className="footer-git" src={ Sun } alt="github-logo"/></Link>
            <br/>
            <p className="copyright">Empower &copy; 2017 All Rights Reserved.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
