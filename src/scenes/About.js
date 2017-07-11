import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap'

import Github from '../assets/images/github.svg'
import Landing from './Landing'
import Footer from '../components/Footer'
import '../assets/about.css'
import '../assets/animate.css'
import Sun from '../assets/images/sun.svg'
import Jen from '../assets/images/jen.jpg'
import Marg from '../assets/images/margaret.jpg'
import Emily from '../assets/images/emily.jpg'
import LinkedIn from '../assets/images/Linkedin-2-icon.png'

class Home extends Component {
  render() {
    return (
      <div>
      <div className="about-div well well-large">
        <div className="header-div text-center">
          <h1>Emp<img src={ Sun } alt="sun-logo" className="about-sun animated flip"/>wer</h1>
          <h4 className="about-tagline">an anxiety self-management platform</h4>
          <Landing />
        </div>
      </div>
      <Row className="upper-row">
        <Col sm={12} md={6} className="about-left">
        <div className="inner-div">
          <div className="text-center">
            <h3>An Empowerment Model</h3>
            <hr />
          </div>
          <p>Evidence shows that when people participate in their treatment, they get better faster. Monitoring their progress demystifies anxiety, giving people back an element of control.</p>
        </div>
        </Col>
        <Col sm={12} md={6} className="about-right">
          <div className="inner-div">
            <div className="text-center about-right-heading">
              <h1>anxiety management</h1>
            </div>
            <p>Empower teaches individuals the skills to manage their own anxiety through self-monitoring and self-care.</p>
            <p>Through mental health assessment, clincians can track their patient's progress and encourage an active and long-term participation in treatment.</p>
            <p className="smaller-text">This appliction utilizes the GAD-7, a brief measure for assessing generalized anxiety disorder. <em>Spitzer RL, Kroenke K, Williams JB, et al. Archives of Internal Medicine. 2006;166:1092-1097.</em></p>
          </div>
        </Col>
      </Row>
      <Grid className="about-grid">
      <div className="text-center">
        <h1>meet the team</h1>
      </div>
        <Row>
          <Col sm={12} md={4} className="text-center">
            <img src={ Jen } alt="Jennifer" className="profile-pic" />
            <h2>Jennifer Winer</h2>
            <p>Software Developer <Link to="https://www.linkedin.com/in/jenniferwiner/" target="blank"><img src={ LinkedIn } alt="github" className="linkedLogo"/></Link><Link to="https://github.com/jenniferwiner/" target="blank"><img src={ Github } alt="github" className="gitLogo"/></Link></p>
            <p>Passionate Coder & <br/>Mental Health Advocate</p>
            <p><i>Boulder, CO</i></p>
          </Col>
          <Col sm={12} md={4} className="text-center">
            <img src={ Emily } alt="Emily" className="profile-pic text-center" />
            <h2>Emily Ringoen</h2>
            <p>Software Developer <Link to="https://www.linkedin.com/in/emily-ringoen/" target="blank"><img src={ LinkedIn } alt="github" className="linkedLogo"/></Link><Link to="https://github.com/emilyaringoen/" target="blank"><img src={ Github } alt="github" className="gitLogo"/></Link></p>
            <p>Inspired Creative &<br/> Driven Problem Solver</p>
            <p><i>Boulder, CO</i></p>
          </Col>
          <Col sm={12} md={4} className="text-center">
            <img src={ Marg } alt="Margaret" className="profile-pic text-center" />
            <h2>Margaret Lazar</h2>
            <p>Project Consultant</p>
            <p>Network Director of Allied Health <br/> & Integrated Care Services<br/></p>
            <p><i>St Vincent's Hospital Sydney, NSW</i></p>
          </Col>
        </Row>
      </Grid>
      <Footer />
      </div>
    )
  }
}

export default Home
