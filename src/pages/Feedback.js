import React, { Component } from 'react';
import Header from './Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">Feedback</h1>
      </div>
    );
  }
}

export default Feedback;
