import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Nav, NavItem, Button } from 'react-bootstrap'
import { Cookies } from 'react-cookie'
import '../assets/sidenav.css'

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
        	<Modal.Title className="Modal-title">EmpowerU</Modal.Title>
          <br />
        </Modal.Header>
      	<Modal.Body>
          <Link to="/" onClick={this.logout} className="sidenav_link">Logout</Link>
          <hr />
          <Link to="/home" className="sidenav_link">Alternatives</Link>
          <hr />
          <Link to="/home" className="sidenav_link">Take a Survey</Link>
          <hr />
        </Modal.Body>
      </Modal>
    );
  }
}

class SideNav extends Component {
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

export default SideNav
