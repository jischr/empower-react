import React, {Component} from 'react'
import { Cookies } from 'react-cookie'
import { API_URL } from '../config'
import { Row, Col, Button, FormGroup, FormControl, HelpBlock } from 'react-bootstrap'
import $ from 'jquery'


import SideNavUser from '../components/SideNavUser'
import Header from '../components/Header'
import '../assets/journals.css'

class Journal extends Component {
  constructor() {
    super()

    this.state = {user_id: '', journals: '', title: '', content: '', sentiment: ''}
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  componentWillMount() {
    let cookie = new Cookies()
    let user_id = cookie.get('id')

    fetch(`${API_URL}/v1/users/journals/${user_id}`)
    .then(res => {
      return res.json().then((user) => {
        if (user.journals) {
          let journals = user.journals.map((entry) => {
            return (<div key={entry.id} className="entry_div"><h2>{entry.title} {res.created_at}</h2><h4>{res.created_at}</h4><p>{entry.content}</p><p>Sentiment: <i className={entry.sentiment}></i></p></div>)
          })
          this.setState({journals: journals, user_id: user_id})
        }
      })
    })
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value})
  }

  handleContentChange(e) {
    this.setState({ content: e.target.value})
  }

  handleSave(e) {
    e.preventDefault()
    let content = this.state.content
    $.ajax ({
      url: 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment/',
      beforeSend: function(xhrObj) {
        xhrObj.setRequestHeader("Content-Type", "application/json");
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "644e5ed6f0a9434882158e6b91c70012");
        xhrObj.setRequestHeader("Accept", "application/json");
      },
      type: 'POST',
      data: `{
        'documents': [{
              'language': 'en',
              'id': '1',
              'text': "${content}"
            }
          ]
        }`
      })
      .done((dataSentiment) => {
        if (dataSentiment.documents[0].score < .33) {
          console.log('sad', dataSentiment.documents[0].score)
          this.setState({sentiment: 'fa fa-frown-o sentiment-icon'})
        } else if (dataSentiment.documents[0].score < .66) {
          console.log('average', dataSentiment.documents[0].score)
          this.setState({sentiment: 'fa fa-meh-o sentiment-icon'})
        } else {
          console.log('happy', dataSentiment.documents[0].score)
          this.setState({sentiment: 'fa fa-smile-o sentiment-icon'})
        }
      })
      .fail(err => {
        console.log(err)
      }).then(() => {
        console.log('posting in post', this.state.sentiment)
        fetch(`${API_URL}/v1/journals/`, {
          method: 'POST',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: this.state.user_id,
            title: this.state.title,
            content: this.state.content,
            sentiment: this.state.sentiment
          })
        }).then((res) => {
          return res.json().then((res) => {
            let journals = this.state.journals
            journals.push(<div key={res.id} className="entry_div"><h2>{res.title}</h2><h4>{res.created_at}</h4><p> {res.content}</p><p>Sentiment: <i className={res.sentiment}></i></p></div>)
            this.setState(journals: journals)
          })
        })
      })

  }

  render() {
    return (
      <div>
      <SideNavUser />
      <Header />
      <Row className="row_height">
      <Col sm={6} className="form_side">
      <h3>today's entry</h3>
      <form onSubmit={this.handleSave}>
        <FieldGroup
          id="formControlsEmail"
          type="text"
          placeholder="Title"
          onChange = {this.handleTitleChange}
        />
        <FormGroup controlId="formControlsTextarea">
          <FormControl
           componentClass="textarea"
           placeholder="Write your thoughts..."
           onChange = {this.handleContentChange}
          />
        </FormGroup>
        <div className="text-center">
        <Button type="submit" >
          Save
        </Button>
        </div>
      </form>
      </Col>

      <Col sm={6} className="entries_side">
        <h1>Your Journal</h1>
        <p className="text-center description">Just the act of recording your thoughts reduces anxiety.<br/><span>why not give it a try?</span></p>
        <div className="outer_journal_div">{this.state.journals}</div>
      </Col>
      </Row>
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

export default Journal
