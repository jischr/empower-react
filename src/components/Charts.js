import React, {Component} from 'react'
import { API_URL } from '../config'
import { Col, Row } from 'react-bootstrap'
import '../assets/graphs.css'

var LineChart = require('react-chartjs').Line

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
      created_at: ''
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
        this.setState({first_name: user.first_name, last_name: user.last_name, scores: scores_list, dates: label_list, education: user.education, birth_date: user.birth_date, created_at: date, sex: user.sex})
      })
    })
  }

  render() {
    let date = this.state.dates
    let score = this.state.scores
    let chartData = {
        labels: date,
        datasets: [    {
                 label: "My First dataset",
                 fill: false,
                 fillColor: "rgba(237, 237, 237, .1)",
                 strokeColor: "rgba(237, 237, 237, .5)",
                 data: score
             }]
    }


    let chartOptions = {
        // scale: {
        //     yAxes: [{
        //         ticks: {
        //             beginAtZero:true
        //         }
        //     }],
        //     xAxes: [{
        //         ticks: {
        //             beginAtZero:true
        //         }
        //     }],
        // },
        scaleOverride: true,
        scaleSteps: 11,
        scaleStepWidth: 2,
        scaleStartValue: 0,
        scaleFontColor: "rgb(23, 54, 71)",

    }
    return (
      <div>
      <Col sm={6} className="graph_side">
        <h1>GAD-7 Assessment Scores</h1>
        <LineChart data={chartData} options={chartOptions} width="600" height="250"/>
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
            <h2 className="most-recent-score">18</h2>
          </Col>
        </Row>
      </Col>
      </div>
    )
  }
}

export default Charts
