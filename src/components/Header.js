import React, {Component} from 'react'
import { Cookies } from 'react-cookie'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import '../assets/homeUser.css'
import Sun from '../assets/images/sun.svg'

class Header extends Component {
  render() {
    return (
      <div>

        <div className="well well-large welcome text-center">
          <img className="text-center welcome-sun" src={ Sun } />
        </div>
      </div>
    )
  }
}

export default Header
