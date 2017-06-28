import React, {Component} from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Jumbotron } from 'react-bootstrap'

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
        <div className="container">
          <Jumbotron className="alternatives">
            <Alternatives />
          </Jumbotron>
        </div>
        <div className="text-center">
          <Link to="/survey"><Button>Take a Survey</Button></Link>
        </div>
      </div>
    )
  }
}

export default HomeUser
