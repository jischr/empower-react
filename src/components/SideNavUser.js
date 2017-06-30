import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import { Cookies } from 'react-cookie'

import '../assets/sidenav.css'
import Phone from '../assets/images/phone.svg'

class Sidebar extends Component {
  constructor() {
    super()
    this.logout = this.logout.bind(this)
  }

  logout() {
    let cookies = new Cookies()
    cookies.remove('isLoggedIn')
    cookies.remove('id')
    cookies.remove('isUser')
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
          <Link to="/" onClick={this.logout} className="sidenav_link">Logout</Link>
          <hr />
          <Link to="/survey" className="sidenav_link">Take a Survey</Link>
          <hr />
          <Link to="/home" className="sidenav_link">Home</Link>
          <hr />
          <div className="well well-lg survey-side">
            <h3>Why SURVEYS?</h3>
            <p>These surveys provide a SNAPSHOT into your feelings at a particular moment. With a bunch of vantage points, you and your doctor can more accurately assess how you are feeling. <br/><br/>Studies have shown that just the act of recording your thoughts reduces your anxiety. Why not give it a try?</p>
          </div>
          <div className="well well-lg crisis_div">
            <h3>Need Help?</h3>
            <p className="bold_header">Help is Just Phone Call Away</p>
            <p><img src={Phone} alt="phone-logo" className="phone_logo"/> 1-844-493-TALK (8255)</p>
            <Link to="http://coloradocrisisservices.org/" target="blank"><p>http://coloradocrisisservices.org/</p></Link>
            <p className="bold_header">Boulder Walk-in Crisis Services</p>
            <p>3180 Airport Road Boulder, CO 80301</p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

class SideNavUser extends Component {
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
  	return (
    	<div className='Sidenav pull-left'>
      	<Button onClick={ () => this.updateModal(true) } className="margin-left sidenav_openbtn"><span className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span></Button>
        <Sidebar side='right' isVisible={ this.state.isVisible } onHide={ () => this.updateModal(false) }>
        </Sidebar>
      </div>
    )
  }
}

export default SideNavUser
