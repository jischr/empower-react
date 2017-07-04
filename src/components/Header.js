import React, {Component} from 'react'
import { Cookies } from 'react-cookie'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { API_URL } from '../config'
import '../assets/homeUser.css'
import Sun from '../assets/images/sun.svg'
import Man from '../assets/images/user.svg'
import Circle from '../assets/images/x-circle.svg'
import Clipboard from '../assets/images/clipboard.svg'
import SideNavUser from './SideNavUser'
import SideNavC from './SideNavC'


class Header extends Component {
  constructor (props) {
    super(props)
    this.state = { name: '',
      patient_number: '',
      isUser: ''
    }

    this.logout = this.logout.bind(this)
  }

  componentWillMount() {
    let cookies = new Cookies()
    let id = cookies.get('id')
    let isUser = +cookies.get('isUser') ? true : false

    let userStatus = isUser ? 'users' : 'clinicians'
    fetch(`${API_URL}/v1/${userStatus}/${id}`, {
      method: 'GET',
      headers: {
        Authorization: cookies.get('token')
      }
    })
    .then(res => {
      return res.json().then((user) => {
        let full_name = `${user.first_name} ${user.last_name}`
        this.setState({name: full_name, patient_number: user.patient_number, isUser: isUser })
      })
    })
  }

  logout() {
    let cookies = new Cookies()
    cookies.remove('isLoggedIn')
    cookies.remove('id')
    cookies.remove('isUser')
    cookies.remove('name')
    cookies.remove('token')
  }

  render() {
    return (
      <div>
        <div className="well well-large welcome">
        <Row className="welcome-row">
          <Col md={9} sm={12}>
          { this.state.isUser &&
            <SideNavUser />
          }
          { !this.state.isUser &&
            <SideNavC usersToChild={this.props.usersToChild}/>
          }
          <h2>Emp <img className="welcome-sun" src={ Sun } alt="empowerU"/> wer</h2>
          </Col>
          <Col md={3} sm={12}>
            <p className="welcome_name"><img className=" welcome-user" src={ Man } alt="man logo"/>&nbsp;{this.state.name}&nbsp;&nbsp;&nbsp;&nbsp;
              { this.state.isUser &&
                <span>
                  <img className="welcome-user" src={ Clipboard } alt="patient number"/>&nbsp;{this.state.patient_number}&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              }
              <Link to="/" onClick={this.logout}><img className="welcome-user" src={ Circle } alt="logout logo"/>&nbsp;Logout</Link>
            </p>
          </Col>
        </Row>
        </div>
      </div>
    )
  }
}

export default Header
