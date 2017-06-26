import React, {Component} from 'react'
import SideNav from './SideNav.js'
import { Cookies } from 'react-cookie'

class HomeUser extends Component {
  constructor() {
    super()

  }

  componentWillMount() {
    let cookie = new Cookies()
    let user_id = cookie.get('id')
    fetch(`http://localhost:3000/alternatives/${user_id}`, {
      method: 'GET'
    })
    .then(res => {
      return res.text().then((alts) => {
        alts = JSON.parse(alts)
        console.log(alts)
      })
    })
    }

  render() {
    return (
      <div>
        <SideNav />
        <header>
          <h2>Welcome</h2>
        </header>
      </div>
    )
  }
}

export default HomeUser
