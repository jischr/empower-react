import React, {Component} from 'react'
import SideNav from './SideNav'
import '../assets/homeUser.css'
import { Cookies } from 'react-cookie'
import { Button } from 'react-bootstrap'

class HomeUser extends Component {
  constructor() {
    super()
    this.state = {
      alt_ideas: '',
      name: ''
    }
  }

  componentWillMount() {
    let cookie = new Cookies()
    let user_id = cookie.get('id')

    fetch(`http://localhost:3000/v1/users/${user_id}`)
    .then(res => {
      return res.json().then((user) => {
        let alt_ideas = user.alternatives.map((alt) => {
          return (<li key={alt.id} className="alt-list-text text-center">{alt.text}</li>)
        })
        this.setState({alt_ideas: alt_ideas, name: user.first_name})
      })
    })
    }

  render() {
    return (
      <div>
        <SideNav />
        <div className="well well-large welcome">
          <h1 className="text-center welcome-text">Welcome, {this.state.name}</h1>
        </div>
        <div className="container">
          <div className="jumbotron alternatives">
            <ul>
              {this.state.alt_ideas}
            </ul>
            <Button>Add New</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeUser
