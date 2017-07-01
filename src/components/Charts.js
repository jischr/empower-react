import React, {Component} from 'react'
import { API_URL } from '../config'
import { Col, Row } from 'react-bootstrap'
import '../assets/graphs.css'

import {Line} from 'react-chartjs-2'
// var LineChart = require('react-chartjs').Line

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
      most_recent_score: ','
    }
  }

  componentWillMount() {
    let user_id = window.location.href.split('/')[4]
    fetch(`${API_URL}/v1/users/scores/${user_id}`)
    .then(res => {
      return res.json().then((user) => {
        console.log(user);
        let label_list = []
        let scores_list = user.scores.map((score) => {
          let date = score.updated_at.substring(0, 10)
          label_list.push(date)
          return score.score_value
        })
        let date = user.created_at.substring(0, 10)
        this.setState({first_name: user.first_name, last_name: user.last_name, scores: scores_list, dates: label_list, education: user.education, birth_date: user.birth_date, created_at: date, sex: user.sex, most_recent_score: scores_list[scores_list.length - 1]})
      })
    })
  }

  render() {
    let date = this.state.dates
    let score = this.state.scores
    console.log('here', score)
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
        labels: {
          fontColor: 'rgb(232, 232, 232)'
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            display: true,
            fontColor: 'rgb(51, 51, 51)',
            beginAtZero: true,
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
            beginAtZero: true
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
          <Col sm={7}>
            <p><span>Date of Birth:</span> <br />{this.state.birth_date}</p>
            <p><span>Sex:</span> <br />{this.state.sex}</p>
            <p><span>Education:</span> <br />{this.state.education}</p>
          </Col>
          <Col sm={5}>
            <h3 className="most-recent-heading">most recent score: </h3>
            <h2 className="most-recent-score">{this.state.most_recent_score}</h2>
          </Col>
        </Row>
      </Col>
      </div>
    )
  }
}

export default Charts
