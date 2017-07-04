import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import { Grid, Row, Col } from 'react-bootstrap'

import { Github } from '../assets/images/github.svg'
import Landing from './Landing'
import '../assets/about.css'
import Sun from '../assets/images/sun.svg'
import Arrow from '../assets/images/chevron-down.svg'
import Jen from '../assets/images/jen.jpg'
import Marg from '../assets/images/margaret.jpg'
import Emily from '../assets/images/emily2.jpg'

class Home extends Component {
  render() {
    return (
      <div>
      <div className="about-div well well-large">
        <div className="header-div text-center">
          <h1>Emp<img src={ Sun } alt="sun-logo" className="about-sun"/>wer</h1>
          <h4 className="about-tagline">an anxiety self-management platform</h4>
          <Landing />
        </div>
      </div>
      <Row className="upper-row">
        <Col sm={12} md={6} className="about-left">
          <h3>An Empowerment Model</h3>
        </Col>
        <Col sm={12} md={6} className="about-right">
          <div className="inner-div">
            <p>Evidence shows that when people participate in their treatment, they get better faster. Monitoring thier progress demystifies anxiety, giving people back an element of control.</p>
            <p>Empower teaches individuals to manage their anxiety. After their professional treatment is finished, they have the skills--including journaling and meditation--to maintain their progress.</p>
          </div>
        </Col>
      </Row>
      <Grid className="about-grid">
        <Row>
          <Col sm={12} md={4}>
            <img src={ Jen } alt="Jennifer" className="profile-pic text-center" />
            <h2>Jennifer Winer</h2>
            <p>Developer</p>
            <p><Link to="https://www.linkedin.com/in/jenniferwiner/" target="blank"></Link><Link to="https://github.com/jenniferwiner/" target="blank"><img src={ Github } alt="github" className="gitLogo"/></Link></p>
          </Col>
          <Col sm={12} md={4}>
            <img src={ Emily } alt="Emily" className="profile-pic text-center" />
            <h2>Emily Ringoen</h2>
            <p>Developer</p>
            <p><Link to="https://www.linkedin.com/in/emily-ringoen/" target="blank"></Link><Link to="https://github.com/emilyaringoen/" target="blank"><img src={ Github } alt="github" className="gitLogo"/></Link></p>
          </Col>
          <Col sm={12} md={4}>
            <img src={ Marg } alt="Margaret" className="profile-pic text-center" />
            <h2>Margaret ?</h2>
            <p>Project Consultant</p>
          </Col>
        </Row>
      </Grid>
      </div>
    )
  }
}

export default Home
