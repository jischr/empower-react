import React, {Component} from 'react'

var LineChart = require('react-chartjs').Line

class Charts extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    // fetch(`http://localhost:3000/v1/scores/1`)
    // .then(res => {
    //   return res.json().then((scores) => {
    //     console.log(scores)
    //   })
    // })
  }

  render() {
    let chartData = {
        labels: ["6/23", "6/27", "6/28", "7/4"],
        datasets: [    {
                 label: "My First dataset",
                 fillColor: ["rgba(0,10,220,0.5)","rgba(220,0,10,0.5)","rgba(220,0,0,0.5)","rgba(120,250,120,0.5)" ],
                 strokeColor: "rgba(220,220,220,0.8)",
                 highlightFill: "rgba(220,220,220,0.75)",
                 highlightStroke: "rgba(220,220,220,1)",
                 data: [12, 19, 3, 5]
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
        <LineChart data={chartData} options={chartOptions} width="600" height="250"/>
      </div>
    )
  }
}

export default Charts
