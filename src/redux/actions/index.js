export const RECEIVE_DATA = 'RECEIVE_DATA';

export const receiveData = (playersName, email) => ({
  type: RECEIVE_DATA,
  playersName,
  email,
});
