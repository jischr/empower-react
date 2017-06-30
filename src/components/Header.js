import React, {Component} from 'react'
import { Cookies } from 'react-cookie'
import { Row, Col } from 'react-bootstrap'

import '../assets/homeUser.css'
import Sun from '../assets/images/sun.svg'
import Man from '../assets/images/user.svg'


class Header extends Component {
  constructor () {
    super()
    this.state = {name: ''}
  }

  componentWillMount() {
    let cookies = new Cookies()
    let id = cookies.get('id')
    if (cookies.get('isUser')){
      fetch(`http://localhost:3000/v1/users/${id}`)
      .then(res => {
          return res.json().then((user) => {
            let full_name = `${user.first_name} ${user.last_name}`
            this.setState({name: full_name})
          })
      })
    } else {
      fetch(`http://localhost:3000/v1/clinicians/${id}`)
      .then(res => {
          return res.json().then((clinician) => {
            console.log('clinician', clinician)
            let full_name = `${clinician.first_name} ${clinician.last_name}`
            this.setState({name: full_name})
          })
      })
    }
  }

  render() {
    return (
      <div>
        <div className="well well-large welcome text-center">
        <Row>
          <Col sm={8}>
            <h2>Emp <img className="text-center welcome-sun" src={ Sun } alt="empowerU"/> wer</h2>
          </Col>
          <Col sm={3}>
            <p className="welcome_name"><img className="text-center welcome-user" src={ Man } alt="man logo"/> {this.state.name}</p>
          </Col>
        </Row>
        </div>
      </div>
    )
  }
}

export default Header
