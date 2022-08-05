import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Components/Login';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
