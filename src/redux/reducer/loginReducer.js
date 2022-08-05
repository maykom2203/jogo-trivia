import { RECEIVE_DATA } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_DATA:
    return {
      ...state,
      name: action.playersName,
      gravatarEmail: action.email,
    };
  default:
    return state;
  }
};

export default loginReducer;
