import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { reciveEmail } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      disabledBol: true,
      email: '',
      playersName: '',
    };

    this.hadleChange = this.hadleChange.bind(this);
    this.activateButn = this.activateButn.bind(this);
  }

  hadleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, this.activateButn);
  }

  activateButn() {
    const { email, playersName } = this.state;
    const zero = 0;
    if (email.includes('.com') && email.includes('@') && playersName.length > zero) {
      this.setState({ disabledBol: false });
    } else {
      this.setState({ disabledBol: true });
    }
  }

  render() {
    const { email, playersName, disabledBol } = this.state;
    // const { usersEmail } = this.props;
    return (
      <form>
        <label htmlFor="playersName">
          Nome:
          <input
            type="text"
            data-testid="input-player-name"
            name="playersName"
            value={ playersName }
            onChange={ this.hadleChange }
          />
          <label htmlFor="email">
            Email:
            <input
              type="email"
              data-testid="input-gravatar-email"
              name="email"
              value={ email }
              onChange={ this.hadleChange }
            />
          </label>
        </label>
        <button
          type="button"
          disabled={ disabledBol }
          //   onClick={ () => usersEmail(email) }
          data-testid="btn-play"
        >
          Play

        </button>
      </form>
    );
  }
}

export default Login;
