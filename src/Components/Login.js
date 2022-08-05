import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { receiveData } from '../redux/actions';
// import { Link } from 'react-router-dom';
// import { reciveEmail } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      disabledBol: true,
      email: '',
      playersName: '',
      opa: '',
    };

    this.hadleChange = this.hadleChange.bind(this);
    this.activateButn = this.activateButn.bind(this);
    this.saveToken = this.saveToken.bind(this);
    this.redirect = this.redirect.bind(this);
    // this.click = this.click.bind(this);
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

  redirect() {
    const { savePlayersName, history } = this.props;
    const { playersName, opa } = this.state;
    savePlayersName(playersName);
    history.push('/game');
    console.log(opa);
  }

  async saveToken() {
    console.log('oi');
    try {
      const url = 'https://opentdb.com/api_token.php?command=request';
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      localStorage.setItem('token', json.token);
    } catch (error) {
      console.log(error);
    }
    this.setState({ opa: 'oi' }, this.redirect);
  }

  render() {
    const { email, playersName, disabledBol } = this.state;
    // const red = <Redirect to="/game" />;
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
          onClick={ this.saveToken }
          data-testid="btn-play"
        >
          Play

        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  savePlayersName: (playersName) => dispatch(receiveData(playersName)),
});

Login.propTypes = {
  savePlayersName: PropTypes.string.isRequired,
  history: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
