import { PLAYER_SCORE } from '../actions';

const INITIAL_STATE = {
  score: 0,
};

const scoreReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  default:
    return state;
  }
};

export default scoreReducer;
