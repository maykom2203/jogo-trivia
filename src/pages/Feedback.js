import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Header from './Header';
import { zerarScore } from '../redux/actions';

class Feedback extends Component {
  constructor() {
    super();
    this.state = ({
      motivationalPhrase: '',
      backLogin: false,
      goRanking: false,
    });
    this.feedbackSentense = this.feedbackSentense.bind(this);
    this.backToLogin = this.backToLogin.bind(this);
    this.goToRanking = this.goToRanking.bind(this);
  }

  componentDidMount() {
    this.feedbackSentense();
  }

  feedbackSentense() {
    const { questions } = this.props;
    // const good = 'Well Done!';
    // const bad = 'Could be better...';
    const maggicNumber = 3;
    if (questions >= maggicNumber) {
      this.setState({ motivationalPhrase: 'Well Done!' });
    } else {
      this.setState({ motivationalPhrase: 'Could be better...' });
    }
  }

  backToLogin() {
    const { zerarScoreDispatch } = this.props;
    this.setState({
      backLogin: true,
    });
    const obj = {
      score: 0,
    };
    zerarScoreDispatch(obj);
  }

  goToRanking() {
    this.setState({
      goRanking: true,
    });
  }

  render() {
    const { motivationalPhrase, backLogin, goRanking } = this.state;
    const { score, questions } = this.props;
    return (
      <div className="gameBox">
        <Header />
        <div className="feedBackBox" >
        <h2 data-testid="feedback-text">{motivationalPhrase}</h2>
        <h3 data-testid="feedback-total-score">{score}</h3>
        <h3 data-testid="feedback-total-question">{questions}</h3>
        <Button
          type="Button"
          data-testid="btn-play-again"
          variant="primary"
          onClick={ this.backToLogin }
        >
          Play Again
        </Button>
        <Button
          type="Button"
          variant="warning"
          data-testid="btn-ranking"
          onClick={ this.goToRanking }
        >
          Ranking
        </Button>
        { backLogin && <Redirect to="/" /> }
        { goRanking && <Redirect to="/ranking" /> }
      </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  questions: state.player.questions,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  zerarScoreDispatch: (payload) => dispatch(zerarScore(payload)),
});

Feedback.propTypes = {
  questions: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  zerarScoreDispatch: PropTypes.number.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
