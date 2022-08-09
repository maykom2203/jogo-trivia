import { RECEIVE_DATA, PLAYER_SCORE } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_DATA:
    return {
      player: {
        ...state.player,
        name: action.playersName,
        gravatarEmail: action.email,
      },
    };
  case PLAYER_SCORE:
    return {
      player: {
        ...state.player,
        score: state.player.score + action.score,
      },
    };
  default:
    return state;
  }
};

export default loginReducer;
