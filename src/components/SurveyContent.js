import React, {Component} from 'react'
import { FormGroup, Radio, Button } from 'react-bootstrap'
import { Cookies } from 'react-cookie'
import { Redirect } from 'react-router-dom'


class SurveyContent extends Component {
  constructor() {
    super()
    this.state = {
      score: 0,
      question_id: 0,
      current_choice: 0,
      redirect: false,
      current_survey: 'GAD-7',
    }

    this.surveys = {
        'PHQ-9': [
          'Little interest or pleasure in doing things',
          'Feeling down, depressed or hopeless',
          'Trouble falling or staying asleep',
          'Feeling tired or having little energy',
          'Poor appetite or overeating',
          'Feeling bad about yourself - or that you are a failure or have let yourself or your family down',
          'Trouble concentrating on things, such as reading the newspaper or watching television',
          'Moving or speaking so slowly that other people could have noticed. Or the opposite - being so figety or restless that you have been moving around a lot more than usual',
          'Thoughts that you would be better off dead, or of hurting yourself'
        ],
        'GAD-7': [
          'Feeling nervous, anxious or on edge',
          'Not being able to stop or control worrying',
          'Worrying too much about different things',
          'Trouble relaxing',
          'Being so restless that it is hard to sit still',
          'Becoming easily annoyed or irritable',
          'Feeling afraid as if something awful might happen'
        ]
    }


    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderRedirect = this.renderRedirect.bind(this)
  }
  componentWillMount() {
    console.log(this.surveys['GAD-7'][this.state.question_id])
  }

    handleClick() {
      let score = this.state.score + this.state.current_choice
      console.log(score)
      if (this.state.question_id === (this.surveys[this.state.current_survey].length -1)) {
        let cookies = new Cookies()
        let user_id = +cookies.get('id')
        fetch(`http://localhost:3000/v1/scores`, {
          method: 'POST',
          body: JSON.stringify({ score_value: score, user_id: user_id, measure_id: 2}),
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
          <h4>Over the few days, how often have you been bothered by any of the following problems?</h4>
          <h3>{this.surveys[this.state.current_survey][this.state.question_id]}</h3>
           <FormGroup>
             <Radio name="qs" inline value="0" onChange={this.handleChange}>
               Not at all
             </Radio>
             <Radio name="qs" inline value="1" onChange={this.handleChange}>
               Some of the time
             </Radio>
             <Radio name="qs" inline value="2" onChange={this.handleChange}>
               More than half of the time
             </Radio>
             <Radio name="qs" inline value="3" onChange={this.handleChange}>
               Nearly all the time
             </Radio>
           </FormGroup>
           <Button onClick={this.handleClick}>Click</Button>
         </div>
        {this.renderRedirect()}
      </div>
    )
  }
}

export default SurveyContent
