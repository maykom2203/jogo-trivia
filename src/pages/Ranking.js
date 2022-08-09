import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();
    this.state = ({
      goLogin: false,
    });
    this.goToLogin = this.goToLogin.bind(this);
  }

  goToLogin() {
    this.setState({
      goLogin: true,
    });
  }

  render() {
    const { goLogin } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.goToLogin }
        >
          Login
        </button>
        { goLogin && <Redirect to="/" /> }
      </div>
    );
  }
}

export default Ranking;
