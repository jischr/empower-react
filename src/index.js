import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Router } from 'react-router-dom'
import Landing from './scenes/Landing';
import Home from './scenes/Home';
import registerServiceWorker from './registerServiceWorker';
import './assets/general.css'

ReactDOM.render(
  <BrowserRouter>
    <div className="App">
      <Route exact path="/" component={Landing}></Route>
      <Route exact path="/home" component={Home}></Route>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()
