import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { zerarScore } from '../redux/actions';

class Ranking extends Component {
  constructor() {
    super();
    this.state = ({
      goLogin: false,
      scoreState: undefined,
    });
    this.goToLogin = this.goToLogin.bind(this);
    this.saveLocal = this.saveLocal.bind(this);
  }

  componentDidMount() {
    this.saveLocal();
  }

  goToLogin() {
    const { zerarScoreDispatch } = this.props;
    this.setState({
      goLogin: true,
    });
    const obj = {
      score: 0,
    };
    zerarScoreDispatch(obj);
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
    this.setState({ scoreState: array });
  }

  render() {
    const { goLogin, scoreState } = this.state;
    console.log(scoreState);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {scoreState && scoreState.sort((a, b) => b.score - a.score).map((obj, i) => (
          <div key={ i }>
            <img src={ obj.url } alt="Img Gravatar" />
            <span
              data-testid={ `player-name-${i}` }
            >
              {obj.name}
            </span>
            <span data-testid={ `player-score-${i}` }>
              {obj.score}
            </span>

          </div>
        ))}
        <Button
          type="Button"
          data-testid="btn-go-home"
          variant="warning"
          onClick={ this.goToLogin }
        >
          Login
        </Button>
        { goLogin && <Redirect to="/" /> }
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  zerarScoreDispatch: (payload) => dispatch(zerarScore(payload)),
});

Ranking.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  zerarScoreDispatch: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
