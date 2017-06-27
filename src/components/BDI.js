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
      ['I do not feel like a failure', 0],
      ['I feel I have failed more than the average person', 1],
      ['As I look back on my life, all I can see is a lot of failure', 2],
      ['I feel I am a complete failure', 3]],
      [['I get as much satisfaction out of things as I used to', 0],
      ['I don\'t enjoy things the way I used to', 1],
      ['I don\'t get real satisfaction out of anything anymore', 2],
      ['I am dissatisfied or bored with everything', 3]],
      [['I don\'t feel particularly guilty', 0],
      ['I feel guilty a god part of the time', 1],
      ['I feel quite guilty most of the time', 2],
      ['I feel guilty all of the time', 3]],
      [['I don\'t feel disappointed in myself', 0],
      ['I am disappointed in myself', 1],
      ['I am disgusted with myself', 2],
      ['I hate myself', 3]],
      [['I don\'t have any thoughts of killing myself', 0],
      ['I have thoughts of killing myself, but I would not carry them out', 1],
      ['I would like to kill myself', 2],
      ['I would kill myself if I had the chance', 3]],
      [['I have not lost interest in other people', 0],
      ['I am less interested in other people than I used to be', 1],
      ['I have lost most of my interest', 2],
      ['I have lost all of my interest in other people', 3]],
      [['I make decisions about as well as I ever could', 0],
      ['I put off making decisions more than I used to', 1],
      ['I have greater difficulty in making decisions than before', 2],
      ['I can\'t make decisions at all anymore', 3]],
      [['I don\'t feel I look any worse than I used to', 0],
      ['I am worried that I am looking old or unattractive', 1],
      ['I feel that there are permanent changes in my appearance that make me look unattractive', 2],
      ['I believe that I look ugly', 3]],
      [['I can work about as well as before', 0],
      ['It takes an extra effort to get started at doing something', 1],
      ['I have to push myself very hard to do anything', 2],
      ['I can\'t do any work at all', 3]],
      [['I don\'t get more tired than usual', 0],
      ['I get tired more easily than usual', 1],
      ['I get tired from doing almost anything', 2],
      ['I am too tired to do anything', 3]],
      [['My appetite is no worse than usual', 0],
      ['My appetite is not as good as it used to be', 1],
      ['My appetite is much worse now', 2],
      ['I have no appetite at all anymore', 3]]
    ]

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
