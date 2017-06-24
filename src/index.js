import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import Landing from './scenes/Landing';
import registerServiceWorker from './registerServiceWorker';
import './assets/general.css'

ReactDOM.render(
  <BrowserRouter>
    <div className="App">
      <Route exact path="/" component={Landing}></Route>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()
