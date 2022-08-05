import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Game from './Components/Game';
import Settings from './Components/Settings';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    );
  }
}

export default App;
