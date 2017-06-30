import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import
  { FormGroup,
    FormControl,
    HelpBlock,
    Button,
    ButtonGroup,
    Col,
    ControlLabel,
  } from 'react-bootstrap'

import { API_URL } from '../config'

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
      sex: null,
      education: null,
      birth_date: null,
      errors: [],
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
    this.handleBirthDateChange = this.handleBirthDateChange.bind(this)
    this.handleSexChange = this.handleSexChange.bind(this)
    this.handleEducationChange = this.handleEducationChange.bind(this)
  }

  handleRedirect() {
    if (this.state.redirect) {
      return <Redirect to={"/"} />
    }
  }

  handleSignup(e) {
    e.preventDefault()
    let userStatus
    let userData = {first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email, password: this.state.password}

    if (this.state.isUser) {
      userStatus = 'users'
      userData['phone_number'] = this.state.phone_number
      userData['patient_number'] =  Math.random().toString(36).substring(7)
      userData['education'] = this.state.education
      userData['sex'] = this.state.sex
      userData['birth_date'] = this.state.birth_date
    }
    else {
      userStatus = 'clinicians'
      userData['practice'] = this.state.practice
    }

    fetch(`${API_URL}/v1/${userStatus}`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json()
    })
    .then(loginRes => {
      if (loginRes.errors) {
        let errors = []
        for (let key in loginRes.errors) {
          errors.push(`${key} ${loginRes.errors[key]}`)
        }
        this.setState({errors: errors})
      }
      else {
        this.setState({redirect: true})
      }
    })
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
  handleBirthDateChange(e) {
    this.setState({ birth_date: e.target.value})
  }
  handleSexChange(e) {
    this.setState({ sex: e.target.value})
  }
  handleEducationChange(e) {
    this.setState({ education: e.target.value})
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
            <div>
            <Col xs={6} className="grid-form-left">
              <FormGroup>
              <ControlLabel>Birth Date</ControlLabel>
              <FieldGroup
                id="formControlsBirthDate"
                type="date"
                placeholder="Birth Date"
                onChange={this.handleBirthDateChange}
                required={true}
              />
              </FormGroup>
            </Col>
            <Col xs={6} className="grid-form-right">
              <FormGroup controlId="formControlsSelect">
              <ControlLabel>Sex</ControlLabel>
              <FormControl componentClass="select" placeholder="select"         onChange={this.handleSexChange}>
                <option selected={true} disabled={true}>Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                </FormControl>
              </FormGroup>
            </Col>
            <FormGroup controlId="formControlsSelect">
              <FormControl componentClass="select" placeholder="select" onChange={this.handleEducationChange}>
                <option selected={true} disabled={true}>Years of Education after High School</option>
                <option value="High School">&lt; 2</option>
                <option value="Associate's or Bachelor's Degree">2-4 years (Associates or Bachelor's degree)</option>
                <option value="Post-Bachelor's Degree">> 4 (Post-Bachelor's degree)</option>
                </FormControl>
            </FormGroup>
            <FieldGroup
              id="formControlsPhoneNumber"
              type="text"
              placeholder="Phone Number"
              onChange={this.handlePhoneNumberChange}
              required={true}
            />
            </div>
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
        {this.state.errors.map((error, index) => {
          return <h5 key={index} className="error text-center">{error}</h5>
        })}
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
