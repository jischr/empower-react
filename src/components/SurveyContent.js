import React, {Component} from 'react'
import { FormGroup, Radio, Button, Grid, Col, Row } from 'react-bootstrap'
import { Cookies } from 'react-cookie'
import { Redirect } from 'react-router-dom'

import { API_URL } from '../config'
import '../assets/survey.css'
import Arrow from '../assets/images/chevrons-right.svg'

class SurveyContent extends Component {
  constructor() {
    super()
    this.state = {
      score: 0,
      question_id: 0,
      current_choice: 0,
      redirect: false,
      survey_status: 'Next Question',
      disabled: true,
      checked: false
    }

    this.surveys = {
      'GAD-7': [
        'Feeling nervous, anxious or on edge',
        'Not being able to stop or control worrying',
        'Worrying too much about different things',
        'Trouble relaxing',
        'Being so restless that it is hard to sit still',
        'Becoming easily annoyed or irritable',
        'Feeling afraid as if something awful might happen'
    ]}

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderRedirect = this.renderRedirect.bind(this)
  }


  handleClick() {
    let score_val = this.state.score + this.state.current_choice
    if (this.state.question_id === (this.surveys['GAD-7'].length -2)) {
        this.setState({ survey_status: 'Submit Survey'})
    }
    else if (this.state.question_id === (this.surveys['GAD-7'].length -1)) {
      let cookies = new Cookies()
      let user_id = +cookies.get('id')
      fetch(`${API_URL}/v1/scores`, {
        method: 'POST',
        body: JSON.stringify({ score_value: score_val, user_id: user_id, measure_id: 1}),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => {
        this.setState({redirect: true})
      })

    }
    let question_id = +this.state.question_id + 1
    this.setState({score: score_val, question_id: question_id, disabled: true, checked: false})
  }

    handleChange(e) {
      this.setState({current_choice: +e.target.value, disabled: false})
    }

    renderRedirect() {
      if (this.state.redirect) {
        return (<Redirect to="/home" />)
      }
    }

  render() {
    return (
      <div>
        <Row>
          <Col xs={12} sm={6} className="question_side">
                <h4><span>Over the past few days,</span> <br /> have you been bothered by any of the following problems?</h4>
                <hr />
                <img src={Arrow} alt="arrow logo" className="arrow_logo"/>
                <h3>{this.surveys['GAD-7'][this.state.question_id]}</h3>
          </Col>
          <Col xs={12} sm={6} className="answer_side">
              <FormGroup>
                <Radio name="qs" inline value="0" onChange={this.handleChange} defaultChecked={false} className="radio_btn first">
                Not at all
                </Radio>
                <Radio name="qs" inline value="1" onChange={this.handleChange} className="radio_btn">
                Some of the time
                </Radio>
                <Radio name="qs" inline value="2" onChange={this.handleChange} className="radio_btn">
                More than half of the time
                </Radio>
                <Radio name="qs" inline value="3" onChange={this.handleChange} className="radio_btn">
                Nearly all the time
                </Radio>
              </FormGroup>
              <Button onClick={this.handleClick}>{this.state.survey_status}</Button>
            </Col>
          </Row>
        {this.renderRedirect()}
      </div>
    )
  }
}

export default SurveyContent
