import React, {Component} from 'react'

import '../assets/homeUser.css'
import Sun from '../assets/images/sun.svg'

class Header extends Component {
  render() {
    return (
      <div>
        <div className="well well-large welcome text-center">
          <h2>Emp <img className="text-center welcome-sun" src={ Sun } alt="empowerU"/> werU</h2>
        </div>
      </div>
    )
  }
}

export default Header
