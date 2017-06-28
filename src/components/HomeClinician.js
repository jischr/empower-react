import React, {Component} from 'react'
import { Cookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { Jumbotron } from 'react-bootstrap'

import Header from './Header'
import Charts from './Charts'
import SideNavC from './SideNavC'
import AddUser from './AddUser'
import '../assets/homeUser.css'

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
    let cookies = new Cookies()
    let c_id = cookies.get('id')
    this.setState({ c_id: c_id })
    fetch(`http://localhost:3000/v1/clinicians/${c_id}`)
    .then(res => {
      return res.json().then((clinician) => {
        let usersToChild = []
        let users = clinician.users.map((user) => {
          usersToChild.push(user)
          return (<li key={user.patient_number} className="alt-list-text text-center"><Link to="/home">{user.first_name} {user.last_name}</Link></li>)
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
        <SideNavC usersToChild={usersToChild} />
        <Header />
        <div className="container">
          <Jumbotron>
            <h1 className="text-center">Your Patients:</h1>
            <ul>
            {this.state.users}
            </ul>
            <AddUser c_id={c_id}/>
          </Jumbotron>
          <Charts />
        </div>
      </div>
    )
  }
}

export default HomeClinician
