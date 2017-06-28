import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Router } from 'react-router-dom'

import Landing from './scenes/Landing';
import Home from './scenes/Home';
import Survey from './scenes/Survey';
import Signup from './scenes/Signup'

import registerServiceWorker from './registerServiceWorker';
import './assets/general.css'

ReactDOM.render(
  <BrowserRouter>
    <div className="App">
      <Route exact path="/" component={Landing}></Route>
      <Route exact path="/home" component={Home}></Route>
      <Route exact path="/survey" component={Survey}></Route>
      <Route exact path="/signup" component={Signup}></Route>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()
