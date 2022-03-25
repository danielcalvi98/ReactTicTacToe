import React from 'react';
import { Route, Switch } from "react-router";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Match from './components/Match';
import Notfound from "./components/Notfound";
import './main.css';

class App extends React.Component {
  render() {
      return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/dashboard" component={ Dashboard } />
          <Route exact path ="/match/:id" component={ Match } />
          <Route path="*" component={ Notfound } />
        </Switch>
      </div>
    );
  }
}

export default App;
