import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Router } from 'react-router-dom'
import Landing from './scenes/Landing';
import HomeUser from './scenes/HomeUser';
import Measure from './scenes/Measure'
import registerServiceWorker from './registerServiceWorker';
import './assets/general.css'

ReactDOM.render(
  <BrowserRouter>
    <div className="App">
      <Route exact path="/" component={Landing}></Route>
      <Route path="/measure" component={Measure}/>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()
