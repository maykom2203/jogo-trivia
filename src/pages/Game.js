import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import '../App.css';

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
    });

    this.getQuestions = this.getQuestions.bind(this);
    this.shuffleAnswers = this.shuffleAnswers.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  async componentDidMount() {
    await this.getQuestions();
    this.shuffleAnswers();
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
    // history.push('/');
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
      red: '' });
  }

  nextQuestion({ target }) {
    console.log(target);
    this.setState({ red: 'red-border', green: 'green-border', btnNext: true });

    this.setState((estadoAnterior) => ({
      questionNumber: estadoAnterior.questionNumber + 1,
    }));
  }

  render() {
    const { printedQuestion, printedAlternatives,
      correctAlternative, logOut, green, red, btnNext } = this.state;
    // if (questions.length === 0) {
    //   this.setState({ logOut: true });
    // }
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
                  onClick={ this.nextQuestion }
                  className={ green }
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
                >
                  {alternative}

                </button>)
          ))}
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

export default Game;
