import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import '../assets/homeUser.css'
import Github from '../assets/images/github.svg'

class Footer extends Component {
  render() {
    return (
      <div>
        <div className="footer">
          <div className="container-fluid login-footer">
            <Link className="footer-link" to="https://github.com/jenniferwiner/empower-api" target="blank"><img className="footer-git" src={Github} alt="github-logo"/></Link>
            <p className="copyright">EmpowerU &copy; 2017 All Rights Reserved.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
