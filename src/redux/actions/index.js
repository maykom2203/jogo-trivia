export const RECEIVE_DATA = 'RECEIVE_DATA';

export const receiveData = (playersName) => ({
  type: RECEIVE_DATA,
  playersName,
});
