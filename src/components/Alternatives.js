import React, { Component } from 'react'
import
  { FormGroup,
    FormControl,
    HelpBlock,
    Button
  } from 'react-bootstrap'

import { Cookies } from 'react-cookie'

class Alternatives extends Component {
  constructor() {
    super()

    this.state = {
      text: '',
      alt_ideas: '',
      name: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
    let cookie = new Cookies()
    let user_id = cookie.get('id')

    fetch(`http://localhost:3000/v1/users/${user_id}`)
    .then(res => {
      return res.json().then((user) => {
        if (user.alternatives) {
          let alt_ideas = user.alternatives.map((alt) => {
            return (<li key={alt.id} className="alt-list-text text-center">{alt.text}</li>)
          })
          this.setState({alt_ideas: alt_ideas, name: user.first_name})
        }
      })
    })
    }

  handleChange(e) {
    this.setState({ text: e.target.value})
  }

  handleClick(e) {
    let cookies = new Cookies()
    let user_id = cookies.get('id')
    e.preventDefault()
    fetch(`http://localhost:3000/v1/alternatives`, {
      method: 'POST',
      body: JSON.stringify({ text: this.state.text, user_id: user_id}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json().then((res) => {
        let alts = this.state.alt_ideas
        let newAlt = (<li key={res.id} className="alt-list-text text-center">{res.text}</li>)
        alts.push(newAlt)
        this.setState({alt_ideas: alts})
      })
    })
    this.setState({text: ''})
  }

  render() {
    return (
      <div>
      <ul>
        {this.state.alt_ideas}
      </ul>
      <form onSubmit={this.handleClick}>
        <FormGroup>
          <FieldGroup
            id="formControlsAlt"
            type="text"
            placeholder="Enter an Alternative"
            onChange = {this.handleChange}
            required={true}
            value ={this.state.text}
          />
        </FormGroup>
        <Button type="submit">+ Alternative</Button>
      </form>
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

export default Alternatives
