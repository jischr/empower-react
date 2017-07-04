import React, {Component} from 'react'
import { API_URL } from '../config'
import { Col, Row, Button } from 'react-bootstrap'
import '../assets/graphs.css'

import {Line} from 'react-chartjs-2'

class Charts extends Component {
  constructor() {
    super()

    this.state = {
      scores: [],
      dates: [],
      first_name: '',
      last_name: '',
      birth_date: '',
      education: '',
      sex: '',
      created_at: '',
      most_recent_score: '',
      phone_number: '',
      error: '',
      success: '',
      user_id: ''
    }

    this.sendSMS = this.sendSMS.bind(this)
    this.getGraphData = this.getGraphData.bind(this)
  }

  componentWillUpdate(nextProps, nextState) {
    if (window.location.href.split('/')[4] !== this.state.user_id) {
      this.getGraphData()
    }
  }

  getGraphData() {
    let user_id = window.location.href.split('/')[4]
    fetch(`${API_URL}/v1/users/scores/${user_id}`)
    .then(res => {
      return res.json().then((user) => {
        let label_list = []
        let scores_list = user.scores.map((score) => {
          let date = user.updated_at.substring(5, 10) + '-' + user.updated_at.substring(0, 4)
          label_list.push(date)
          return score.score_value
        })
        let date = user.created_at.substring(5, 10) + '-' + user.created_at.substring(0, 4)
        this.setState({
          first_name: user.first_name,
          last_name: user.last_name,
          scores: scores_list,
          dates: label_list,
          education: user.education,
          birth_date: user.birth_date,
          created_at: date,
          sex: user.sex,
          most_recent_score: scores_list[scores_list.length - 1],
          phone_number: user.phone_number,
          user_id: user_id
        })
      })
    })
  }

  sendSMS() {
    fetch(`${API_URL}/twilio`, {
      method: 'POST',
      body: JSON.stringify({phone_number: this.state.phone_number, user_name: this.state.first_name}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json().then((response) => {
        if (response.error) {
          this.setState({error: response.error})
        } else if (response.success) {
          this.setState({success: response.success})
        }
      })
    })
  }

  render() {
    let date = this.state.dates
    let score = this.state.scores
    let chartData = {
        labels: date,
        datasets: [    {
                 label: "GAD-7 Scores",
                 fill: false,
                 fillColor: "rgba(237, 237, 237, .1)",
                 borderColor: "rgba(237, 237, 237, .5)",
                 data: score
             }]
    }


    let chartOptions = {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            display: true,
            fontColor: 'rgb(51, 51, 51)',
            beginAtZero: true,
            max: 21
          },
          scaleLabel: {
            display: true,
            fontColor: 'rgb(51, 51, 51)',
            fontSize: '18',
            labelString: 'GAD-7 Score'
          }
        }],
        xAxes: [{
          ticks: {
            display: true,
            fontColor: 'rgb(51, 51, 51)',
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            fontColor: 'rgb(51, 51, 51)',
            fontSize: '18',
            labelString: 'Date of Assessment'
          }
        }]
      }
    }

    return (
      <div>
      <Col sm={6} className="graph_side">
        <h1>GAD-7 ASSESSMENT SCORES</h1>
        <div className="graph">
          <Line className="graph" data={chartData} options={chartOptions} width={500} height={400}/>
        </div>
      </Col>
      <Col sm={6} className="user_info_side">
        <Row>
          <Col sm={7}>
            <h1>{this.state.first_name} {this.state.last_name}</h1>
          </Col>
          <Col sm={5}>
            <h5>User since: {this.state.created_at}</h5>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col sm={7} className="user_content">
            <p><span>Date of Birth:</span> <br />{this.state.birth_date}</p>
            <p><span>Sex:</span> <br />{this.state.sex}</p>
            <p><span>Education:</span> <br />{this.state.education}</p>
          </Col>
          <Col sm={5}>
            <h3 className="most-recent-heading">most recent score: </h3>
            <h2 className="most-recent-score">{this.state.most_recent_score}</h2>
          </Col>
        </Row>
        <div className="sms text-center">
          <Button onClick={this.sendSMS}>Send SMS Reminder</Button>
          <p className="error_message">{this.state.error}</p>
          <p className="success_message">{this.state.success}</p>
        </div>
      </Col>
      </div>
    )
  }
}

export default Charts
