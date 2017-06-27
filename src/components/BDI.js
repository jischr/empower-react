import React, {Component} from 'react'
import { FormGroup, Radio, Button } from 'react-bootstrap'
import { Cookies } from 'react-cookie'
import { Redirect } from 'react-router-dom'


class BDI extends Component {
  constructor() {
    super()
    this.state = {
      score: 0,
      question_id: 0,
      current_choice: 0,
      redirect: false
    }

    this.questions = [[
      ['I don\'t feel sad', 0],
      ['I feel sad', 1],
      ['I feel sad all the time and can\'t snap out of it', 2],
      ['I am so sad or unhappy that I can\'t stand it', 3]
    ],
    [
      ['I am not particularly discouraged about the future', 0],
      ['I feel discouraged about the future', 1],
      ['I feel I have nothing to look forward to', 2],
      ['I feel that the future is hopeless and that things cannot improve', 3]
    ]]

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderRedirect = this.renderRedirect.bind(this)
  }

    handleClick() {
      let score = this.state.score + this.state.current_choice
      if (this.state.question_id === (this.questions.length -1)) {
        let cookies = new Cookies()
        let user_id = +cookies.get('id')
        fetch(`http://localhost:3000/v1/scores`, {
          method: 'POST',
          body: JSON.stringify({ score_value: score, user_id: user_id, measure_id: 1}),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => {
          // come back to this!!
          alert("Thanks for completing the survey.")
          this.setState({redirect: true})
        })

      } else {
        let question_id = +this.state.question_id + 1
        this.setState({score: score, question_id: question_id, current_choice: 0})
      }
    }

    handleChange(e) {
      this.setState({current_choice: +e.target.value})
    }

    renderRedirect() {
      if (this.state.redirect) {
        return (<Redirect to="/home" />)
      }
    }

  render() {
    return (
      <div>
        <h1>Hi There</h1>
        <div className="container-fluid">
           <FormGroup>
             <Radio name="q1" inline value={this.questions[this.state.question_id][0][1]} onChange={this.handleChange}>
               {this.questions[this.state.question_id][0][0]}
             </Radio>
             <Radio name="q1" inline value={this.questions[this.state.question_id][1][1]} onChange={this.handleChange}>
               {this.questions[this.state.question_id][1][0]}
             </Radio>
             <Radio name="q1" inline value={this.questions[this.state.question_id][2][1]} onChange={this.handleChange}>
               {this.questions[this.state.question_id][2][0]}
             </Radio>
             <Radio name="q1" inline value={this.questions[this.state.question_id][3][1]} onChange={this.handleChange}>
               {this.questions[this.state.question_id][3][0]}
             </Radio>
           </FormGroup>
           <Button onClick={this.handleClick}>Click</Button>
         </div>
        {this.renderRedirect()}
      </div>
    )
  }
}

export default BDI
