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
  }

  componentWillReceiveProps(nextProps) {
    let users = nextProps.users.map((user) => {
      return (<Link to={`/graph/${user.patient_number}`} className="sidenav_link" key={user.patient_number}>{user.first_name} {user.last_name}</Link>)
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
          <Link to="/" onClick={this.logout} className="sidenav_link">Logout</Link>
          <hr />
          <Link to="/home" className="sidenav_link">Home</Link>
          <hr />
          {this.state.users}
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
