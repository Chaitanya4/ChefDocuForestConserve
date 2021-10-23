import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import Petition from './Petition';
ReactDOM.render(
  <React.StrictMode>
   <React.Fragment>
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={App} />
        <Route path="/home" component={App} /> 
        <Route path="/Petition" component={Petition} /> 
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  </React.Fragment> 
  </React.StrictMode>,
  document.getElementById('root')
);
