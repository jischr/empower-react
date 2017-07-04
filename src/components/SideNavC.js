import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import { Cookies } from 'react-cookie'
import '../assets/sidenav.css'

class Sidebar extends Component {
  constructor() {
    super()
    this.state = {users: []}
    this.logout = this.logout.bind(this)
  }

  logout() {
    let cookies = new Cookies()
    cookies.remove('isLoggedIn')
    cookies.remove('id')
    cookies.remove('isUser')
    cookies.remove('token')
  }

  componentWillReceiveProps(nextProps) {
    let users = nextProps.users.map((user) => {
      return (<li key={user.patient_number}><Link to={`/graph/${user.patient_number}`} className="sidenav_link" >{user.first_name} {user.last_name}</Link></li>)
    })

    this.setState({users: users})
  }

	render() {
  	return (
    	<Modal className='Sidebar left' show={ this.props.isVisible } onHide={this.props.onHide}
      	 autoFocus keyboard>
      	<Modal.Header closeButton>
        	<Modal.Title className="sidebar_title">Empower</Modal.Title>
          <br />
        </Modal.Header>
      	<Modal.Body>
          <Link to="/home" className="sidenav_link">Home</Link>
          <hr />
          <h3 className="modal_h3">SELECT A PATIENT:</h3>
          <ul className="patient_list_ul">
            {this.state.users}
          </ul>
          <div className="well well-lg clinician_div">
            <h3>GAD-7 Assessment</h3>
            <p className="bold_header">What is the GAD-7?</p>
            <p>The GAD-7 (General Anxiety Disorder-7) measures severity of anxiety, mainly in outpatients.</p>
            <p className="bold_header">Guide for Interpreting GAD-7 Scores</p>
            <p><span>0-4: </span>Normal</p>
            <p><span>5-9: </span>Mild anxiety.</p>
            <p><span>10-14: </span>Moderate anxiety.</p>
            <p><span>15-21: </span>Severe anxiety.</p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

class SideNavC extends Component {
	constructor(props, context) {
  	super(props, context);

  	this.state = {
      isVisible: false,
    }
  }

  updateModal(isVisible) {
    this.setState({
      isVisible: isVisible,
      instaShow: false
    })
    this.forceUpdate()
  }



	render() {
    let usersToChild = this.props.usersToChild
  	return (
    	<div className='Sidenav pull-left'>
      	<Button onClick={ () => this.updateModal(true) } className="margin-left sidenav_openbtn"><span className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span></Button>
        <Sidebar side='right' isVisible={ this.state.isVisible } onHide={ () => this.updateModal(false) } users={usersToChild}>
        </Sidebar>
      </div>
    )
  }
}

export default SideNavC
