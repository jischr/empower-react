import React, { Component } from 'react'
import
  { FormGroup,
    FormControl,
    HelpBlock,
    Button,
    ButtonGroup,
    Col
  } from 'react-bootstrap'

class AddUser extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
    this.handleLastNameChange = this.handleLastNameChange.bind(this)
    this.handlePatientNumberChange = this.handlePatientNumberChange.bind(this)
  }

  handleFirstNameChange(e) {
    this.setState({ first_name: e.target.value})
  }
  handleLastNameChange(e) {
    this.setState({ last_name: e.target.value})
  }
  handlePatientNumberChange(e) {
    this.setState({ patient_number: e.target.value})
  }
  handleSubmit(e) {
    e.preventDefault()
    let patient_number = this.state.patient_number
    fetch(`http://localhost:3000/v1/users/${patient_number}`, {
      method: 'PATCH',
      body: JSON.stringify({ clinician_id: this.props.c_id}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json()
    }).then(res => {
      if (res.error) {
        this.setState({ error: res.error})
      }
      else {
        this.setState({ first_name: '', last_name: '', patient_number: '' })
      }
    })

  }
  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FieldGroup
              id="formControlsFirstName"
              type="text"
              placeholder="Patient's First Name"
              onChange = {this.handleFirstNameChange}
              value={this.state.first_name ? this.state.first_name : ''}
            />
            <FieldGroup
              id="formControlsLastName"
              type="text"
              placeholder="Patient's Last Name"
              onChange={this.handleLastNameChange}
              value={this.state.last_name ? this.state.last_name : ''}
            />
            <FieldGroup
              id="formControlsPatientNumber"
              type="text"
              placeholder="Patient Number"
              onChange={this.handlePatientNumberChange}
              value={this.state.patient_number ? this.state.patient_number : ''}
            />
          </FormGroup>
          <Button type="submit">
            Add New Patient
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

export default AddUser
