import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';

class Feedback extends Component {
  constructor() {
    super();
    this.state = ({
      motivationalPhrase: '',
    });
    this.feedbackSentense = this.feedbackSentense.bind(this);
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

  render() {
    const { motivationalPhrase } = this.state;
    const { score, questions } = this.props;
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">{motivationalPhrase}</h2>
        <h3 data-testid="feedback-total-score">{score}</h3>
        <h3 data-testid="feedback-total-question">{questions}</h3>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  questions: state.player.questions,
  score: state.player.score,
});

Feedback.propTypes = {
  questions: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
export default connect(mapStateToProps, null)(Feedback);
