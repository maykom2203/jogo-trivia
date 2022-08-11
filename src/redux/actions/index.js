export const RECEIVE_DATA = 'RECEIVE_DATA';
export const PLAYER_SCORE = 'PLAYER_SCORE';

export const receiveData = (playersName, email) => ({
  type: RECEIVE_DATA,
  playersName,
  email,
});

export const playerScore = (score, questions) => ({
  type: PLAYER_SCORE,
  score,
  questions,
});

export const zerarScore = (payload) => ({
  type: 'RESET_SCORE',
  payload,
});
