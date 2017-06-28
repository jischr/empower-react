import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import
  { FormGroup,
    FormControl,
    HelpBlock,
    Button,
    ButtonGroup,
    Col,
    Grid
  } from 'react-bootstrap'
import { Cookies } from 'react-cookie'

class SignupForm extends Component {
  constructor() {
    super()

    this.state = {
      isUser: true,
      email: '',
      password: '',
      error: '',
      redirect: false
    }
    this.handleRedirect = this.handleRedirect.bind(this)
  }

  handleRedirect() {
    if (this.state.redirect) {
      return <Redirect to={"/home"} />
    }
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
        <form onSubmit={this.handleLogin}>
          <FormGroup>
            <Col xs={6} className="grid-form-left">
            <FieldGroup
              id="formControlsFirstName"
              type="text"
              placeholder="First Name"
            />
            </Col>
            <Col xs={6} className="grid-form-right">
              <FieldGroup
                id="formControlsLastName"
                type="text"
                placeholder="Last Name"
              />
            </Col>
            <FieldGroup
              id="formControlsEmail"
              type="email"
              placeholder="Email"
              onChange = {this.handleEmailChange}
            />
            <FieldGroup
              id="formControlsPhoneNumber"
              type="text"
              placeholder="Phone Number"
            />
            <FieldGroup
              id="formControlsPassword"
              type="password"
              placeholder="Password"
            />
          </FormGroup>
          <Button type="submit">
            Sign Up
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

export default SignupForm
