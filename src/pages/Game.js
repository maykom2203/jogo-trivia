import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import '../App.css';
import { playerScore } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();

    this.state = ({
      questions: [],
      questionNumber: 0,
      printedQuestion: [],
      printedAlternatives: [],
      correctAlternative: [],
      logOut: false,
      red: '',
      green: '',
      btnNext: false,
      contador: 30,
      disableBtn: false,
      localScore: 0,
    });

    this.getQuestions = this.getQuestions.bind(this);
    this.shuffleAnswers = this.shuffleAnswers.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.scoreCalculator = this.scoreCalculator.bind(this);
    this.dispatcher = this.dispatcher.bind(this);
  }

  async componentDidMount() {
    await this.getQuestions();
    this.shuffleAnswers();
    const oneSecond = 1000;
    this.timerID = setInterval(() => {
      this.setState((prevState) => ({
        contador: prevState.contador - 1,
      }));
    }, oneSecond);
  }

  componentDidUpdate(prevProps, prevState) {
    const zero = 0;
    if (prevState.contador === zero) {
      this.setState({
        contador: 0,
        disableBtn: true,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(
      this.setState(this.timerID),
    );
  }

  async getQuestions() {
    const urlToken = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=5&token=${urlToken}`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      const questions = json.results;
      if (questions.length === 0) {
        this.setState({ logOut: true });
        localStorage.clear();
      }
      this.setState({ questions });
    } catch (error) {
      console.log(error);
    }
  }

  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  shuffleAnswers() {
    const { questions,
      questionNumber,
    } = this.state;
    const printedQuestion = questions[questionNumber];
    this.setState({ printedQuestion });
    const correct = printedQuestion.correct_answer;
    this.setState({ correctAlternative: correct });
    const alternatives = printedQuestion.incorrect_answers;
    const array = alternatives.find((alternative) => alternative === correct);
    if (!array) {
      alternatives.push(correct);
    }
    this.setState({ printedAlternatives: this.shuffleArray(alternatives),
      green: '',
      red: '',
      contador: 30,
      disableBtn: false });
  }

  scoreCalculator() {
    const { contador, printedQuestion } = this.state;
    const maggicNumber = 10;
    let sum = 0;
    if (printedQuestion.difficulty === 'hard') {
      const difficulty = 3;
      sum = maggicNumber + (contador * difficulty);
    } else if (printedQuestion.difficulty === 'medium') {
      const difficulty = 2;
      sum = maggicNumber + (contador * difficulty);
    } else {
      const difficulty = 1;
      sum = maggicNumber + (contador * difficulty);
    }

    this.setState({ localScore: sum }, this.dispatcher);

    this.nextQuestion();
  }

  dispatcher() {
    const { localScore } = this.state;
    const { playerScoreDispatch } = this.props;
    playerScoreDispatch(localScore);
  }

  nextQuestion() {
    this.setState({ red: 'red-border', green: 'green-border', btnNext: true });

    this.setState((estadoAnterior) => ({
      questionNumber: estadoAnterior.questionNumber + 1,
    }));
  }

  render() {
    const { printedQuestion, printedAlternatives,
      correctAlternative, logOut, green, red, btnNext,
      contador, disableBtn } = this.state;

    return (
      <div>
        <Header />
        <h1 data-testid="question-category">{printedQuestion.category}</h1>
        <h2 data-testid="question-text">{printedQuestion.question}</h2>
        <div data-testid="answer-options">
          {printedAlternatives.map((alternative, index) => (
            alternative === correctAlternative
              ? (
                <button
                  type="button"
                  key={ index }
                  data-testid="correct-answer"
                  onClick={ this.scoreCalculator }
                  className={ green }
                  disabled={ disableBtn }
                >
                  {alternative}

                </button>)
              : (
                <button
                  type="button"
                  key={ index }
                  data-testid={ `wrong-answer-${index}` }
                  onClick={ this.nextQuestion }
                  className={ red }
                  disabled={ disableBtn }
                >
                  {alternative}

                </button>)

          ))}
          <p>{ contador }</p>
        </div>
        {
          logOut && <Redirect to="/" />
        }
        {
          btnNext && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.shuffleAnswers }
            >
              Next

            </button>)
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  playerScoreDispatch: (score) => dispatch(playerScore(score)),
});

Game.propTypes = {
  playerScoreDispatch: PropTypes.number.isRequired,
};

export default connect(null, mapDispatchToProps)(Game);
