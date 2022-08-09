import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { receiveData } from '../redux/actions';
// import { reciveEmail } from '../redux/actions';
// import Header from './Header';

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
    const { playersName, opa, email } = this.state;
    savePlayersName(playersName, email);
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
      <div>
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
          <Link to="/settings">
            <button type="button" data-testid="btn-settings">
              Configurações
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  savePlayersName: (playersName, email) => dispatch(receiveData(playersName, email)),
});

Login.propTypes = {
  savePlayersName: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);