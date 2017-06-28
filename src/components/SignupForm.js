import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import
  { FormGroup,
    FormControl,
    HelpBlock,
    Button,
    ButtonGroup,
    Col
  } from 'react-bootstrap'
import { Cookies } from 'react-cookie'

class SignupForm extends Component {
  constructor() {
    super()

    this.state = {
      isUser: true,
      email: null,
      password: null,
      first_name: null,
      last_name: null,
      practice: null,
      phone_number: null,
      error: '',
      redirect: false,
      form_incomplete: true
    }
    this.handleRedirect = this.handleRedirect.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
    this.changeUserStatus = this.changeUserStatus.bind(this)

    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
    this.handleLastNameChange = this.handleLastNameChange.bind(this)
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this)
    this.handlePracticeChange = this.handlePracticeChange.bind(this)
  }

  handleRedirect() {
    if (this.state.redirect) {
      return <Redirect to={"/home"} />
    }
  }

  handleSignup(e) {
    e.preventDefault()
  }

  changeUserStatus (e){
    e.target.innerText === 'User' ? this.setState({ isUser: true }) : this.setState({ isUser: false })
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value})
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value})
  }
  handleFirstNameChange(e) {
    this.setState({ first_name: e.target.value})
  }
  handleLastNameChange(e) {
    this.setState({ last_name: e.target.value})
  }
  handlePhoneNumberChange(e) {
    this.setState({ phone_number: e.target.value})
  }
  handlePracticeChange(e) {
    this.setState({ practice: e.target.value})
  }
  render() {
    return (
      <div>
        <div className="text-center">
          <ButtonGroup>
            <Button active={this.state.isUser} onClick={this.changeUserStatus}>User</Button>
            <Button active={!this.state.isUser} onClick={this.changeUserStatus}>Professional</Button>
          </ButtonGroup>
        </div>
        <br/><br/>
        <form onSubmit={this.handleSignup}>
          <FormGroup>
            <Col xs={6} className="grid-form-left">
            <FieldGroup
              id="formControlsFirstName"
              type="text"
              placeholder="First Name"
              onChange={this.handleFirstNameChange}
              required={true}
            />
            </Col>
            <Col xs={6} className="grid-form-right">
              <FieldGroup
                id="formControlsLastName"
                type="text"
                placeholder="Last Name"
                onChange={this.handleLastNameChange}
                required={true}
              />
            </Col>
            <FieldGroup
              id="formControlsEmail"
              type="email"
              placeholder="Email"
              onChange={this.handleEmailChange}
              required={true}
            />
            {this.state.isUser &&
              <FieldGroup
                id="formControlsPhoneNumber"
                type="text"
                placeholder="Phone Number"
                onChange={this.handlePhoneNumberChange}
                required={true}
              />
            }
            {!this.state.isUser &&
              <FieldGroup
                id="formControlsPractice"
                type="text"
                placeholder="Name of Practice"
                onChange={this.handlePracticeChange}
                required={true}
              />
            }
            <FieldGroup
              id="formControlsPassword"
              type="password"
              placeholder="Password"
              onChange={this.handlePasswordChange}
              required={true}
            />
          </FormGroup>
          <div className="text-center">
            <Button type="submit">
              Sign Up
            </Button>
          </div>
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

export default SignupForm