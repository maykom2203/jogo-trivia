import { RECEIVE_DATA, PLAYER_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  questions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_DATA:
    return {
      ...state,
      name: action.playersName,
      gravatarEmail: action.email,
    };
  case PLAYER_SCORE:
    return {
      ...state,
      score: state.score + action.score,
      questions: action.questions,
    };
  default:
    return state;
  }
};

export default player;
