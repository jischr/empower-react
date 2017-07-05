import React, {Component} from 'react'
import { Cookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import { API_URL } from '../config'
import Header from './Header'
import Charts from './Charts'
import SideNavC from './SideNavC'
import AddUser from './AddUser'
import '../assets/homeClinician.css'

class HomeClinician extends Component {
  constructor() {
    super()

    this.state = {
      users: [],
      usersToChild: [],
      c_id: ''
    }
  }

  componentWillMount() {
    let cookie = new Cookies()
    let c_id = cookie.get('id')
    this.setState({ c_id: c_id })
    fetch(`${API_URL}/v1/clinicians/${c_id}`, {
      method: 'GET',
      headers: {
        'Authorization': cookie.get('token')
      }
    })
    .then(res => {
      return res.json().then((clinician) => {
        let usersToChild = []
        let users = clinician.users.map((user) => {
          usersToChild.push(user)
          return (<li key={user.patient_number} className="alt-list-text text-center"><Link to={`/graph/${user.patient_number}`}>{user.first_name} {user.last_name}</Link></li>)
        })
        this.setState({users: users, usersToChild: usersToChild})
      })
    })
  }

  render() {
    let usersToChild = this.state.usersToChild
    let c_id = this.state.c_id
    return (
      <div>
        <Header usersToChild={usersToChild} />
        <Row className="home_clinician">
        { window.location.pathname === '/home' &&
          <div className="row_height">
            <Col sm={6} className="add_user">
              <AddUser c_id={c_id}/>
            </Col>
            <Col sm={6} className="patient_list text-center">
              <p><span>Track patient progress</span> <br /> to better understand their anxiety</p>
              <div className="patient_div">
                <h5>Select a Patient :</h5>
                <ul>
                  {this.state.users}
                </ul>
              </div>
              <h6>basic information | GAD-7 scores | SMS reminders</h6>
            </Col>
          </div>
          }
          { window.location.pathname.split('/')[1] === 'graph' &&
            <Charts />
          }
        </Row>
      </div>
    )
  }
}

export default HomeClinician
