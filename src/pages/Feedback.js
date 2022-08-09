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
    return (
      <div>
        <Header />
        {/* <h1 data-testid="feedback-text">Feedback</h1> */}
        <h2 data-testid="feedback-text">{motivationalPhrase}</h2>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  questions: state.player.questions,
});

Feedback.propTypes = {
  questions: PropTypes.string.isRequired,
};
export default connect(mapStateToProps, null)(Feedback);
