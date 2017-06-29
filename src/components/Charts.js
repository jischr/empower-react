import React, {Component} from 'react'

var LineChart = require('react-chartjs').Line

class Charts extends Component {
  constructor() {
    super()

    this.state = {
      scores: [],
      dates: [],
      first_name: '',
      last_name: ''
    }
  }

  componentWillMount() {
    let user_id = window.location.href.split('/')[4]
    fetch(`http://localhost:3000/v1/users/scores/${user_id}`)
    .then(res => {
      return res.json().then((user) => {
        let label_list = []
        let scores_list = user.scores.map((score) => {
          let date = score.updated_at.substring(0, 19)
          label_list.push(date)
          return score.score_value
        })
        this.setState({first_name: user.first_name, last_name: user.last_name, scores: scores_list, dates: label_list})
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
                 fillColor: ["rgba(0,10,220,0.5)","rgba(220,0,10,0.5)","rgba(220,0,0,0.5)","rgba(120,250,120,0.5)" ],
                 strokeColor: "rgba(220,220,220,0.8)",
                 highlightFill: "rgba(220,220,220,0.75)",
                 highlightStroke: "rgba(220,220,220,1)",
                 data: score
             }]
    }

    let chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
    return (
      <div>
        <h1>{this.state.first_name} {this.state.last_name}</h1>
        <LineChart data={chartData} options={chartOptions} width="600" height="250"/>
      </div>
    )
  }
}

export default Charts
