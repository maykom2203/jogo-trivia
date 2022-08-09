import { combineReducers } from 'redux';
import player from './player';
// import scoreReducer from './ScoreReducer';

const rootReducer = combineReducers({ player });

export default rootReducer;
