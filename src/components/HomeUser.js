import React, {Component} from 'react'
import SideNav from './SideNav.js'
import { Cookies } from 'react-cookie'

class HomeUser extends Component {
  constructor() {
    super()
    this.state = {alt_ideas: ''}
  }

  componentWillMount() {
    let cookie = new Cookies()
    let user_id = cookie.get('id')

    fetch(`http://localhost:3000/v1/alternatives/${user_id}`)
    .then(res => {
      return res.json().then((alts) => {
        let alt_ideas = alts.map((alt) => {
          return (<li key={alt.id}>{alt.text}</li>)
        })
        this.setState({alt_ideas: alt_ideas})
      })
    })
    }

  render() {
    return (
      <div>
        <SideNav />
        <header>
          <h2>Welcome</h2>
          <ul>
            {this.state.alt_ideas}
          </ul>
        </header>
      </div>
    )
  }
}

export default HomeUser
