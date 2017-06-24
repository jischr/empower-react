import React, { Component } from 'react'
import
  { FormGroup,
    FormControl,
    HelpBlock,
    Button,
    ButtonGroup
  } from 'react-bootstrap'
import '../assets/Landing.css'

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      isUser: true,
      email: '',
      password: '',
      error: ''
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.changeUserStatus = this.changeUserStatus.bind(this)
  }

  handleLogin(e) {
    e.preventDefault()
    let userStatus = this.state.isUser ? 'user' : 'clinician'
    fetch(`http://localhost:3000/authenticate/${userStatus}`, {
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
        localStorage.setItem('token', loginRes.auth_token)
        // loginRes.who === 'u' ?
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
