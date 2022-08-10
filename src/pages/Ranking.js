import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends Component {
  constructor() {
    super();
    this.state = ({
      goLogin: false,
    });
    this.goToLogin = this.goToLogin.bind(this);
    this.saveLocal = this.saveLocal.bind(this);
  }

  componentDidMount() {
    this.saveLocal();
  }

  goToLogin() {
    this.setState({
      goLogin: true,
    });
  }

  saveLocal() {
    const { name, score } = this.props;
    const storage = localStorage;
    const url = storage.getItem('url');
    const player = {
      name,
      score,
      url,
    };
    const intitial = JSON.parse(storage.getItem('playerList'));
    let array = [intitial];
    if (intitial === undefined || intitial === null) {
      array = [player];
      storage.setItem('playerList', JSON.stringify(array));
    } else {
      for (let index = 0; index < intitial.length; index += 1) {
        array[index] = intitial[index];
      }
      array.push(player);
      storage.setItem('playerList', JSON.stringify(array));
    }
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
const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

Ranking.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Ranking);
