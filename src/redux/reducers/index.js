import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
// import scoreReducer from './ScoreReducer';

const rootReducer = combineReducers({ loginReducer });

export default rootReducer;
