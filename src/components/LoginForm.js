import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import
  { FormGroup,
    FormControl,
    HelpBlock,
    Button,
    ButtonGroup
  } from 'react-bootstrap'
import { Cookies } from 'react-cookie'

import { API_URL } from '../config'
import '../assets/Landing.css'

class LoginForm extends Component {
  constructor() {
    super()

    this.state = {
      isUser: true,
      email: '',
      password: '',
      error: '',
      redirect: false
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.changeUserStatus = this.changeUserStatus.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
  }

  handleRedirect() {
    if (this.state.redirect) {
      return <Redirect to={"/home"} />
    }
  }

  handleLogin(e) {
    e.preventDefault()
    let userStatus = this.state.isUser ? 'user' : 'clinician'
    fetch(`${API_URL}/authenticate/${userStatus}`, {
      method: 'POST',
      body: JSON.stringify({ email: this.state.email, password: this.state.password}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json()
    })
    .then(loginRes => {
      if (loginRes.error) this.setState({error: 'Bad email or password'})
      else {
        // COOKIES with react-cookie
        const cookies = new Cookies()
        // establish epiration
        let expiration = new Date()
        const milliSecInDay = 86400000
        expiration.setTime(expiration.getTime() + milliSecInDay)
        // set cookie (depending on if user or clinician)
        if (loginRes.user_id) {
          cookies.set('id', loginRes.user_id, {path:'/', expires: expiration})
          cookies.set('isUser', 1, {path:'/', expires: expiration})
          cookies.set('name', loginRes.name, {path:'/', expires: expiration})
          cookies.set('token', loginRes.auth_token, {path:'/', expires: expiration})
        }
        if (loginRes.clinician_id) {
          cookies.set('id', loginRes.clinician_id, {path:'/', expires: expiration})
          cookies.set('isUser', 0, {path:'/', expires: expiration})
          cookies.set('token', loginRes.auth_token, {path:'/', expires: expiration})
        }
        // keep track of login status
        cookies.set('isLoggedIn', 1, {path:'/', expires: expiration})
        this.setState({ redirect: true })
      }
    })
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value})
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value})
  }

  changeUserStatus (e){
    e.target.innerText === 'User' ? this.setState({ isUser: true }) : this.setState({ isUser: false })
  }

  render() {
    return (
      <div>
        <ButtonGroup>
          <Button active={this.state.isUser} onClick={this.changeUserStatus}>User</Button>
          <Button active={!this.state.isUser} onClick={this.changeUserStatus}>Professional</Button>
        </ButtonGroup>
        <br/><br/>
        <form onSubmit={this.handleLogin}>
          <FormGroup>
            <FieldGroup
              id="formControlsEmail"
              type="email"
              placeholder="Email"
              onChange = {this.handleEmailChange}
            />
            <FieldGroup
              id="formControlsPassword"
              type="password"
              placeholder="Password"
              onChange = {this.handlePasswordChange}
            />
          </FormGroup>
          <Button type="submit">
            Sign In
          </Button>
        </form>
        <h5 className="error">{this.state.error}</h5>
        {this.handleRedirect()}
      </div>
    )
  }
}

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
}

export default LoginForm
